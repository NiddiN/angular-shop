import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';

import { InlineFormFieldComponent } from './inline-form-field.component';

@NgModule({
  declarations: [InlineFormFieldComponent],
  imports: [CommonModule, SharedModule],
  exports: [InlineFormFieldComponent]
})
export class InlineFormFieldModule {}
