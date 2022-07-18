
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Link,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';
import { blockContentToPlainText } from 'react-portable-text';
import readingTime from 'reading-time';
import { urlFor } from '../../sanity';
import { Post } from '../../type';
import { formatDate } from '../utils/date';


export interface Props {
  post: Post;
}

export const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <Box
      id='blog-card'
      minW={'345px'}
      maxW={'445px'}
      w={'full'}
      boxShadow={'lg'}
      rounded={'lg'}
      p={6}
      overflow={'hidden'}
      _hover={{
        boxShadow: 'xl',
        transform: 'scale(1.02)',
        transition: 'all 0.3s ease-in-out',
      }}>
      <Box
        h={'210px'}
        bg={'gray.100'}
        mt={-6}
        mx={-6}
        mb={6}
        pos={'relative'}>
        <Link href={`/post/${post.slug.current}`}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            layout={'fill'}
          />
        </Link>
      </Box>
      <Stack>
        <Flex gap={2}>
        {post.categories.map((tag)=>{
          return (
            <Text as='p' key={tag}>
              {tag}
            </Text>
          );
        })} </Flex>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}>
          {post.title}
        </Heading>
        {/* <Text color={'gray.500'}>
          // {post.description}
        </Text> */}
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Avatar
          src={urlFor(post.author.image).width(40).url()}
        />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}>{post.author.name}</Text>
          <Text color={'gray.500'}>{formatDate(post._createdAt)} · {readingTime(blockContentToPlainText(post.body)).text}
          </Text>
        </Stack>
      </Stack>
    </Box>

  );
}
