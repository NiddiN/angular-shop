import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';

import { RemoveFromWishList } from 'src/app/core/wish-list/wish-list.actions';
import { AddToBasket } from 'src/app/core/basket/basket.actions';

import { filter, map, switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { IWishListItem } from 'src/lib/interfaces';

import { AddToBasketDialogComponent } from 'src/app/shared/add-to-basket-dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  @Input()
  public itemsList: IWishListItem[];

  public displayedColumns: string[] = ['image', 'name', 'price', 'toBasket', 'remove'];

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnDestroy() {}

  public onRemoveClick(id: number) {
    this.store.dispatch(new RemoveFromWishList(id));
  }

  public addToBasket(item: IWishListItem) {
    const dialogRef = this.dialog.open(AddToBasketDialogComponent, {
      data: { phone: item.phone }
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(data => !!data?.amount),
        map(data => data.amount),
        switchMap(amount => this.store.dispatch(new AddToBasket(item.phone, amount))),
        switchMap(() => this.store.dispatch(new RemoveFromWishList(item.id)))
      )
      .subscribe(() => {});
  }
}
