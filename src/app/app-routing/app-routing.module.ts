import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/classes/auth.guard';
import { PostPageComponent } from '../blog/post-page/post-page.component';
import { FeedComponent } from '../blog/feed-page/feed.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { RegistrationPageComponent } from '../admin/registration-page/registration-page.component';
import { AccountPageComponent } from '../admin/account-page/account-page.component';
import { UserProfileComponent } from '../admin/components/user-profile/user-profile.component';
import { PublicationsComponent } from '../admin/components/publications/publications.component';
import { CommentsComponent } from '../admin/components/comments/comments.component';
import { LikedPostsComponent } from '../admin/components/liked-posts/liked-posts.component';
import { PostFormComponent } from '../admin/components/post-form/post-form.component';
import { UsersComponent } from '../admin/components/users/users.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: AccountPageComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'publications',
        component: PublicationsComponent,
        data: {
          isAdmin: true,
        },
      },
      {
        path: 'publications/new',
        component: PostFormComponent,
        data: {
          isAdmin: true,
        },
      },
      {
        path: 'publications/edit/:id',
        component: PostFormComponent,
        data: {
          isAdmin: true,
        },
      },
      { path: 'liked-posts', component: LikedPostsComponent },
      {
        path: 'comments',
        component: CommentsComponent,
        data: {
          isAdmin: true,
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          isAdmin: true,
        },
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
  {
    path: 'posts/:id',
    component: PostPageComponent,
  },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
