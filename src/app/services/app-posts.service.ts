import { Injectable } from '@angular/core';

export interface Post {
  id?: number;
  title: string;
  author: string;
  text: string;
  date: Date;
  likes: number;
}
@Injectable({
  providedIn: 'root',
})
export class AppPostsService {
  posts: Post[] = [
    {
      id: 1,
      title: 'Post title - Lorem ipsum dolor',
      author: 'John Doe',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum repudiandae dolor esse est enim tempora commodi, labore delectus beatae cupiditate dolore repellat voluptatibus veniam magni ut maiores nulla facere animi?',
      date: new Date(),
      likes: 5,
    },
    {
      id: 2,
      title: 'Labore delectus beatae cupiditate',
      author: 'Foo Bar',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum repudiandae dolor esse est enim tempora commodi, labore delectus beatae cupiditate dolore repellat voluptatibus veniam magni ut maiores nulla facere animi?',
      date: new Date(),
      likes: 1,
    },
  ];

  updatePosts(post: Post) {
    post.date = new Date();
    post.likes = 0;
    this.posts.unshift(post);
  }
  getPosts() {
    return this.posts;
  }
}
