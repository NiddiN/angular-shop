import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const MODULES = [MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule {}
