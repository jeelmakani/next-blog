import type {
  TypedObject,
} from '@portabletext/types'



export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: TypedObject[];
  categories: Array<string>;
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}


export type Content = {
  publishedAt: string;
  title: string;
  slug: { current: any };
  intro: any;
  summary: string;
  main: any;
  readingTime: string;
  count: number;
}


export type Views = {
  count: number;
}
