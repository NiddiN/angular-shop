import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { PhoneService, BasketService } from 'src/app/core/services';

import { ItemCardComponent } from './components';
import { CatalogPage } from './pages';
import { AddToBasketDialogComponent } from './components/add-to-basket-dialog/add-to-basket-dialog.component';

@NgModule({
  declarations: [CatalogPage, ItemCardComponent, AddToBasketDialogComponent],
  imports: [CommonModule, CatalogRoutingModule, SharedModule],
  providers: [PhoneService, BasketService]
})
export class CatalogModule {}
