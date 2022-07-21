import { Box, Button, FormLabel, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../../../type';


interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Comment(post: Post) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
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
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          maxWidth={'5xl'}
          gap={5}
        >
          <h1>Leave a comment</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text>
              Enjoy this article? Leave a comment below.
            </Text>
            <Input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <FormLabel htmlFor="name">
              <Text fontWeight='extrabold'>Name</Text>
              <Input
                {...register('name', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="name"
                type="text"
              />
            </FormLabel>
            <FormLabel htmlFor="name">
              <Text fontWeight='extrabold'>Email</Text>
              <Input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="Email"
                type="email"
              />
            </FormLabel>
            <FormLabel htmlFor="Comment">
              <Text fontWeight='extrabold'>Comment</Text>
              <Input
                {...register('comment', { required: true })}
                className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
                placeholder="comment"
                type="text"
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
            <Button
              type="submit"
              isLoading={submitted}
              loadingText="Submitting..."
              className="mt-4"
              size="lg"
              variant="outline"
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
    </>
  )
}
export default Comment;
