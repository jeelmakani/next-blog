
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  SpaceProps,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

import { Post } from '../../type';
import { formatDate } from '../utils/date';
import { urlFor } from '../../sanity';


interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: string;
  name: string;
  image: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = ({ name, date, image }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={urlFor(image).width(40).url()}
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{formatDate(date)}</Text>
    </HStack>
  );
};

export interface Props {
  post: Post;
}

export const BlogCard: React.FC<Props> = ({ post }) => {

  return (
    <Container maxW={'7xl'} p="12"  >
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column' }}
        justifyContent="space-between"
        key={post._id}
        padding="2rem"
        boxShadow="xl"
        gap={'2rem'}
        overflow="hidden"
        width="100%"
        _hover={{
          boxShadow: 'lg',
          borderColor: 'gray.300',
          transform: 'translateY(-5px)',
          transitionDuration: '0.5s',
          transitionTimingFunction: "ease-in-out"
        }}
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }} href={`/post/${post.slug.current}`}>
              <Image
                borderRadius="lg"
                // src={
                //   urlFor(post.mainImage).width(420).height(340).fit('max').auto('format').url()
                // }
                src= 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
              alt="some good alt text"
              objectFit="contain"
                  />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <BlogTags tags={post.categories} />
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {post.title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            {post.description}
          </Text>
          <BlogAuthor name={post.author.name} date={post._createdAt} image={post.author.image} />
        </Box>
      </Box>
    </Container>
  );
};

export default BlogCard;
