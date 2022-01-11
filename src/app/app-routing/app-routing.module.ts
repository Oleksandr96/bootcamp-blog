import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostPageComponent } from '../blog/post-page/post-page.component';
import { BlogComponent } from '../blog/feed-page/blog.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const routes: Routes = [
  { path: 'feed', component: BlogComponent },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },

  { path: 'posts/:id', component: PostPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
