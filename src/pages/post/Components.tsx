import style from "../../../styles/Home.module.css";
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { sanityClient, urlFor } from "../../../sanity";
import Image from "next/image";


const myComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ''}
        />
      )
    }
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} >
          {children}
        </a>
      )
    },
    code: ({ children }) => <code className={style.bodycode}>{children}</code>,
  },
  block: {
    h1: ({ children }) => <h1 className={style.bodyh1}>{children}</h1>,
    blockquote: ({ children }) => <blockquote className={style.blockquote}>{children}</blockquote>,
    h2: ({ children }) => <h2 className={style.bodyh2}>{children}</h2>,
    h3: ({ children }) => <h3 className={style.bodyh3}>{children}</h3>,
    h4: ({ children }) => <h4 className={style.bodyh4}>{children}</h4>,
    h5: ({ children }) => <h5 className={style.bodyh5}>{children}</h5>,
  },
}


export default myComponents

