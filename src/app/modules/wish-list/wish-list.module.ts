import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListRoutingModule } from './wish-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddToBasketDialogModule } from 'src/app/shared/add-to-basket-dialog';

import { ListComponent } from './components/list/list.component';
import { WishListPage } from './pages';

@NgModule({
  declarations: [WishListPage, ListComponent],
  imports: [CommonModule, WishListRoutingModule, SharedModule, AddToBasketDialogModule]
})
export class WishListModule {}
