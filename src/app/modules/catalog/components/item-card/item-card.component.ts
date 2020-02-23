import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';

import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, map } from 'rxjs/operators';

import { AddToBasket } from 'src/app/core/basket/basket.actions';
import { AddToWishList, RemoveFromWishList } from 'src/app/core/wish-list/wish-list.actions';

import { IPhone, ICatalogItem } from 'src/lib/interfaces';
import { AddToBasketDialogComponent } from 'src/app/shared/add-to-basket-dialog';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnDestroy {
  @Input()
  public catalogItem: ICatalogItem;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnDestroy() {}

  public onBasketClick() {
    const dialogRef = this.dialog.open(AddToBasketDialogComponent, {
      data: { phone: this.catalogItem.phone }
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(data => !!data?.amount),
        map(data => data.amount)
      )
      .subscribe(amount => this.store.dispatch(new AddToBasket(this.catalogItem.phone, amount)));
  }

  public addToWishList(phone: IPhone) {
    this.store.dispatch(new AddToWishList(phone));
  }

  public removeFromWishList(id: number) {
    this.store.dispatch(new RemoveFromWishList(id));
  }
}
