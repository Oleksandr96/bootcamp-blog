export interface Post {
  _id?: number;
  title: string;
  user: {
    name: string;
  };
  content: string;
  date: Date;
  likes: number;
}
