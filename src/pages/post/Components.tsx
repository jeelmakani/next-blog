
import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from "../../../sanity";
import { Alert, Code, Image, Link, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Nextlink from 'next/link'



const myComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <Image
          src={urlFor(value).width(320).height(240).fit('max').auto('format').url()}
          alt={value.alt || ''}
        />
      )
    }
  },
  marks: {
    em: ({ children }) => <Text as="em">{children}</Text>,
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <Nextlink href={value?.href} target={target}>
          <Link color='blue.500'>
            {children}{' '}<ExternalLinkIcon mx='2px' />
          </Link></Nextlink>
      )
    },
    code: ({ children }) => <Code colorScheme="yellow" fontSize="0.84em"  >{children}</Code>

  },
  block: {
    h1: ({ children }) => <Text fontSize='3xl' fontWeight="bold" letterSpacing="wide" mt={8} >{children}</Text>,
    h2: ({ children }) => <Text fontSize='2xl' fontWeight="bold" letterSpacing="wide" mt={8}>{children}</Text>,
    h3: ({ children }) => <Text fontSize='xl' fontWeight="bold" letterSpacing="wide" mt={8}>{children}</Text>,
    h4: ({ children }) => <Text fontSize='lg' letterSpacing="wide" pt={8}>{children} </Text>,
    h5: ({ children }) => <Text fontSize='md' letterSpacing="wide" pt={8}>{children}</Text>,
    // blockquote: ({ children }) => <blockquote >{children}</blockquote>,
    blockquote: ({ children }) => <Alert
      mt={4}
      w="98%"
      // bg={useColorModeValue('gray.100', 'white')}
      variant="left-accent"
      status="info"
      css={{
        "> *:first-of-type": {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
    >{children}</Alert>,
    normal: ({ children }) => <Text fontSize='md' letterSpacing="wide" pt={8}>{children}</Text>,
  },
  list: {
    bullet: ({ children }) => <UnorderedList fontSize='md' letterSpacing="wide" pt={8}>{children}</UnorderedList>,
    number: ({ children }) => <OrderedList fontSize='md' letterSpacing="wide" pt={8}>{children}</OrderedList>,
  }
}
export default myComponents

