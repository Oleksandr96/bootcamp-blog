import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostComponent } from './components/post/post.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {AppPostsService} from "./services/app-posts.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostComponent,
    SidebarComponent,
    ModalComponent,
    PostFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    AppPostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
