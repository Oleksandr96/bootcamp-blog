import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BlogModule } from './blog/blog.module';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthFormComponent } from './shared/components/auth-form/auth-form.component';
import { AdminModule } from './admin/admin.module';
import { AuthTokenInterceptor } from './shared/classes/auth-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostFormComponent,
    NotFoundComponent,
    AuthFormComponent,
  ],
  entryComponents: [PostFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    AdminModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthTokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
