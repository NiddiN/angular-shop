import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { InlineFormFieldComponent } from './inline-form-field.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InlineFormFieldComponent],
  imports: [CommonModule, SharedModule],
  exports: [InlineFormFieldComponent]
})
export class InlineFormFieldModule {}
