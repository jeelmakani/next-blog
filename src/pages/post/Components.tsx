import style from "../../../styles/Home.module.css";
import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from "../../../sanity";
import { Code, Image, Link, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
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
    code: ({ children }) => <Code fontSize='code' >{children}</Code>

  },
  block: {
    h1: ({ children }) => <Text fontSize='5xl' >{children}</Text>,
    h2: ({ children }) => <Text fontSize='4xl'>{children}</Text>,
    h3: ({ children }) => <Text fontSize='3xl'>{children}</Text>,
    h4: ({ children }) => <Text fontSize='2xl'>{children}</Text>,
    h5: ({ children }) => <Text fontSize='xl'>{children}</Text>,
    blockquote: ({ children }) => <blockquote className={style.blockquote}>{children}</blockquote>,
    normal: ({ children }) => <Text fontSize='xl'>{children}</Text>,
  },
  list: {
    bullet: ({ children }) => <ul><Text fontSize='xl'>{children}</Text></ul>,
    number: ({ children }) => <ol><Text fontSize='xl'>{children}</Text></ol>,
  },
};


export default myComponents

