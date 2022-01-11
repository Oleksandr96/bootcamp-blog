export interface Post {
  _id?: string;
  title: string;
  user: {
    _id?: string;
    firstName: string;
    lastName: string;
    avatarSrc: string;
  };
  tags: {
    _id: string;
  };
  content: string;
  shortDescription: string;
  date: Date;
  likesCount: number;
}
