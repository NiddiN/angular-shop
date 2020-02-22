import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPhone } from 'src/lib/interfaces';

interface DialogData {
  phone: IPhone;
}

@Component({
  selector: 'app-add-to-basket-dialog',
  templateUrl: './add-to-basket-dialog.component.html',
  styleUrls: ['./add-to-basket-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToBasketDialogComponent {
  public phone: IPhone;
  public amount = 1;

  constructor(
    public dialogRef: MatDialogRef<AddToBasketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.phone = data?.phone;
  }

  public onAddClick() {
    this.dialogRef.close({
      amount: this.amount
    });
  }
}
