import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BasketPage } from './pages';
import { BasketListComponent } from './components';

@NgModule({
  declarations: [BasketPage, BasketListComponent],
  imports: [CommonModule, BasketRoutingModule, SharedModule]
})
export class BasketModule {}
