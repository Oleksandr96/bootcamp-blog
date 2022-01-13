import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostPageComponent } from '../blog/post-page/post-page.component';
import { FeedComponent } from '../blog/feed-page/feed.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { RegistrationPageComponent } from '../admin/registration-page/registration-page.component';
import { AuthGuard } from '../shared/classes/auth.guard';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  {
    path: 'registration',
    component: RegistrationPageComponent,
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
