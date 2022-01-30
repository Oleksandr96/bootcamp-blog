export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarSrc?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface authUser {
  email: string;
  password: string;
}
