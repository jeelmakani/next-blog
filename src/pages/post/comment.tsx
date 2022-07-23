import { Box, Button, Center, Divider, FormLabel, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../../../type';


interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface CommentProps {
  postId: string;
  comments: Post['comments'];
}

function Comment({ postId, comments }: CommentProps) {
  const [submitted, setSubmitted] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <>
      {submitted ? (
        <div>
          <h1>Thank you for your comment!</h1>
        </div>
      ) : (
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          maxWidth={'3xl'}
          gap={10}
          marginTop={10}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} flexDirection={'column'} gap={5} >
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                Enjoy this article?
              </Text>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                Leave a comment below.
              </Text>
              <Input
                {...register('_id')}
                type="text"
                display="none"
                name="_id"
                value={postId}
              />
              <FormLabel htmlFor="name">
                <Text fontWeight='extrabold'>Name</Text>
                <Input
                  {...register('name', { required: true })}
                  placeholder="name"
                  type="text"
                  name="name"
                  id="name"
                  mt={2}
                />
              </FormLabel>
              <FormLabel htmlFor="name">
                <Text fontWeight='extrabold'>Email</Text>
                <Input
                  {...register('email', { required: true })}
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  mt={2}
                />
              </FormLabel>
              <FormLabel htmlFor="Comment">
                <Text fontWeight='extrabold'>Comment</Text>
                <Input
                  {...register('comment', { required: true })}
                  placeholder="comment"
                  type="text"
                  name="comment"
                  id="comment"
                  mt={2}
                />
              </FormLabel>
              <Box>
                {errors.name && (
                  <Text color="red.500" fontSize="md">
                    *Name is required*
                  </Text>)}
                {errors.email && (
                  <Text color="red.500" fontSize="md">
                    *Email is required*
                  </Text>
                )}
                {errors.comment && (
                  <Text color="red.500" fontSize="md">
                    *Comment is required*
                  </Text>
                )}
              </Box>
              <Box display="flex" flexDirection={'row'} gap={5}>
                <Button
                  type="reset"
                  onClick={() => reset()}
                  loadingText="Resetting..."
                  size="lg"
                  variant='solid'
                  width={'25%'}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  isLoading={submitted}
                  loadingText="Submitting..."
                  size="lg"
                  variant="outline"
                  width={'75%'}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
          <Text as='u' fontSize={'4xl'} fontWeight={'bold'} align="center">
            Comments
          </Text>
          {comments.map((comment) => (
            <Box key={comment._id}
              display={'flex'}
              flexDirection={'column'}
              gap={5}
              marginTop={1}
              mb={10}
            >
              <Text fontSize={'2xl'} fontWeight={'bold'}
              >
                {comment.name}:
              </Text>
              <Text fontSize={'xl'} fontWeight={'bold'}>
                {comment.comment}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
export default Comment;
