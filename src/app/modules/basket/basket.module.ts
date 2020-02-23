import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BasketPage } from './pages';
import { BasketListComponent, BasketFormComponent, OrderInfoComponent } from './components';

@NgModule({
  declarations: [BasketPage, BasketListComponent, BasketFormComponent, OrderInfoComponent],
  imports: [CommonModule, BasketRoutingModule, SharedModule]
})
export class BasketModule {}
