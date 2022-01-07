import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostPageComponent } from '../post-page/post-page.component';
import { BlogComponent } from '../blog/blog.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'posts/:id', component: PostPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
