
import { Avatar, Box, Container, Divider, Grid, GridItem, Heading, Image, Stack, Text } from "@chakra-ui/react";
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
import Comment from "./comment"

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
        maxWidth="3xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop="5rem"
      >
        <Heading as="h1" size="xl"
          fontSize={{ base: "2rem", md: '3rem', lg: '3.25rem' }}
          mb="2rem"
          mt={
            "1rem"
          }
        >
          {post.title}
        </Heading>
        <Box>

          <Box display="flex" marginBottom={5} flexDirection={'column'} gap={5} justifyContent="center" alignItems={'center'}>
            <Image
              // src={urlFor(post.mainImage).url()}
              src={"https://liebling.eduardogomez.io/content/images/size/w2000/2022/06/3.jpg"}
              alt={post.title}
              width="100%"
              height="80"
              borderRadius='lg'
              objectFit="cover"
            />


          </Box>
          <Text fontSize={{ base: "lg", md: 'lg', lg: 'xl' }} fontWeight='extrabold' mb={5} >
            {post.description}
          </Text>
          <Grid templateColumns='repeat(2,1fr)'
            templateRows='repeat(1,1ft)'
            gap={2}
            marginBottom={5}
          >
            <GridItem
              colStart={1}
              fontWeight="extrabold"
            >
              <Stack direction={'row'} spacing={4} align={'center'}>
                <Avatar
                  src={urlFor(post.author.image).width(40).url()}
                />
                <Text fontWeight={600}>{post.author.name} · {formatDate(post.publishedAt)}</Text>
              </Stack>
            </GridItem>
            <GridItem
              colEnd={6} fontWeight="extrabold"
              mt={3}>
              {readingTime(blockContentToPlainText(post.body)).text}
            </GridItem>
          </Grid>
          <Box>

          </Box>
          <Divider borderBottomWidth={3} />
          <PortableText
            components={myComponents}
            value={post.body}
          />
          <Divider borderBottomWidth={3} />
          <Comment post={post} />
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
