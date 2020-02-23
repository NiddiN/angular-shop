import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared.module';

import { AddToBasketDialogComponent } from './add-to-basket-dialog.component';

@NgModule({
  declarations: [AddToBasketDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [AddToBasketDialogComponent]
})
export class AddToBasketDialogModule {}
