import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'white-snackbar'
      }
    }
  ]
})
export class SharedModule {}
