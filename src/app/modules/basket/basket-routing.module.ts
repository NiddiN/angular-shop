import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketPage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: BasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule {}
