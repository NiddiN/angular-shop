import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ItemCardComponent } from './components';
import { CatalogPage } from './pages';
import { PhoneService } from 'src/app/core/services/phone.service';

@NgModule({
  declarations: [CatalogPage, ItemCardComponent],
  imports: [CommonModule, CatalogRoutingModule, SharedModule],
  providers: [PhoneService]
})
export class CatalogModule {}
