export interface Post {
  _id?: string;
  title: string;
  user: {
    firstName: string;
    lastName: string;
  };
  tags: {
    name: string;
  };
  content: string;
  date: Date;
  likesCount: number;
}
