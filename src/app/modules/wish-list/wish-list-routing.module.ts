import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishListPage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: WishListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishListRoutingModule {}
