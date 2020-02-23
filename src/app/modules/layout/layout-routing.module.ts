import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPage } from './pages/layout/layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('../basket/basket.module').then(m => m.BasketModule)
      },
      {
        path: 'wish-list',
        loadChildren: () => import('../wish-list/wish-list.module').then(m => m.WishListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
