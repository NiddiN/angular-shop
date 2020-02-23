import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent, WishListPopupComponent } from './components';
import { LayoutPage } from './pages/layout/layout.page';

@NgModule({
  declarations: [LayoutPage, HeaderComponent, WishListPopupComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule]
})
export class LayoutModule {}
