import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddToBasketDialogModule } from 'src/app/shared/add-to-basket-dialog/add-to-basket-dialog.module';

import { PhoneService, BasketService } from 'src/app/core/services';

import { ItemCardComponent } from './components';
import { CatalogPage } from './pages';

@NgModule({
  declarations: [CatalogPage, ItemCardComponent],
  imports: [CommonModule, CatalogRoutingModule, SharedModule, AddToBasketDialogModule],
  providers: [PhoneService, BasketService]
})
export class CatalogModule {}
