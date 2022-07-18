
import { Box, Container, Divider, Grid, GridItem, Heading, Image, Img, Text, useColorModeValue } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react"
import { blockContentToPlainText } from "react-portable-text"
import { Post } from "../../../type";
import myComponents from "./Components";
import { sanityClient, urlFor } from "../../../sanity";
import readingTime from "reading-time";

import { formatDate } from "../../utils/date";

interface Props {
  post: Post;
}

const BlogPost: React.FC<Props> = ({ post }) => {
  useEffect(() => {
    console.log(post.body);
  }, [post]);


  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Container
        maxWidth="5xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="5rem"
      >
        <Heading as="h1" size="xl"
          fontSize={{ base: "2rem", md: '3rem', lg: '3.75rem' }}
        >
          {post.title}
        </Heading>
        <Box>
          
          <Box display="flex" marginBottom={5} flexDirection={'column'} gap={5} justifyContent="center" alignItems={'center'}>
          <Text as="div" fontSize={{ base: "0.5rem", md: '0.75rem', lg: '1.25rem' }} >
            {post.description}
          </Text>
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              width="auto"
              height="80"
              borderRadius='lg'
            />

           
          </Box>
          <Grid templateColumns='repeat(2,1fr)'
              templateRows='repeat(1,1ft)'
              gap={2}>
              <GridItem
                colStart={1}
              >
                {formatDate(post.publishedAt)}
              </GridItem>
              <GridItem
                colEnd={6}>
                {readingTime(blockContentToPlainText(post.body)).text}
              </GridItem>
            </Grid>
          <Divider />
          <PortableText
            components={myComponents}
            value={post.body}
          />
        </Box>
      </Container>
    </>);
}
export default BlogPost;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
  _id,
  slug {
      current
  }
}`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params?.slug);
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  author -> {
    name,
    image
  },
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id && 
    approved == true
  ],
  description,
  mainImage,
  slug,
  body,
  publishedAt,
}`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
