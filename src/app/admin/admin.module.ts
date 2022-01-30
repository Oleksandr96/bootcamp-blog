import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPageComponent } from './account-page/account-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LikedPostsComponent } from './components/liked-posts/liked-posts.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { PublicationsComponent } from './components/publications/publications.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostActionsComponent } from './components/post-actions/post-actions.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { TagsComponent } from './components/tags/tags.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    RegistrationPageComponent,
    AccountPageComponent,
    UserProfileComponent,
    LikedPostsComponent,
    PublicationsComponent,
    CommentsComponent,
    PostFormComponent,
    PostActionsComponent,
    TagsComponent,
    UsersComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
  ],
})
export class AdminModule {}
