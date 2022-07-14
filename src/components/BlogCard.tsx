
import {
  Image,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { Post } from '../../type';
import { urlFor } from '../../sanity';
import { formatDate } from '../utils/date';

export interface Props {
  post: Post;
}


export const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <Center py={"6"} >
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        key={post._id}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={urlFor(post.mainImage).width(445).url()}
            width={120}
            height={120}
            w="auto"
            h="auto"
            borderWidth={5}
            borderStyle="solid"

          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {post.categories}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {post.title}
          </Heading>
          <Text color={'gray.500'}>
            {post.description}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={urlFor(post.author.image).width(40).url()}

          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{post.author.name}</Text>
            <Text color={'gray.500'}> {formatDate(post._createdAt)}· 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
