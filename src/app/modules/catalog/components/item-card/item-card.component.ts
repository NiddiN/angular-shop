import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, map } from 'rxjs/operators';

import { IPhone } from 'src/lib/interfaces';

import { AddToBasketDialogComponent } from '../add-to-basket-dialog/add-to-basket-dialog.component';
import { AddToBasket } from 'src/app/core/basket/basket.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnDestroy {
  @Input()
  public phone: IPhone;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnDestroy() {}

  public onBasketClick() {
    const dialogRef = this.dialog.open(AddToBasketDialogComponent, {
      data: { phone: this.phone }
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(data => !!data?.amount),
        map(data => data.amount)
      )
      .subscribe(amount => this.store.dispatch(new AddToBasket(this.phone, amount)));
  }
}
