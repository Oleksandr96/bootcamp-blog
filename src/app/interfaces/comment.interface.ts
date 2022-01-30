export interface Comment {
  _id?: string;
  content: string;
  date: string;
  postId: string;
  isApproved?: boolean;
  edited?: boolean;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatarSrc: string;
  };
}
