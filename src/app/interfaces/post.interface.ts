import { Tag } from './tag.interface';

export interface Post {
  _id?: string;
  title: string;
  user: {
    _id?: string;
    firstName: string;
    lastName: string;
    avatarSrc: string;
  };
  tags: Tag[];
  content: string;
  shortDescription: string;
  date: Date;
  likesCount: number;
}
