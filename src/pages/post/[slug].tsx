
import { Box, Grid, GridItem, Heading, Image, Img } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react"
import { Post } from "../../../type";

import myComponents from "./Components";
import { sanityClient, urlFor } from "../../../sanity";



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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="xl"
          fontSize={{ base: "2rem", md: '3rem', lg: '3.75rem' }}
        >{post.title}</Heading>
        <Box>
          <Grid templateColumns='repeat(2,1fr)'
            templateRows='repeat(1,1ft)'
            gap={2}>
            <GridItem
              colEnd={6}>
              reading time is 1 minute
            </GridItem>
          </Grid>
        </Box>
        <Box>
          <PortableText
            components={myComponents}
            value={post.body}
          />
        </Box>
      </Box>


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
  body
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
