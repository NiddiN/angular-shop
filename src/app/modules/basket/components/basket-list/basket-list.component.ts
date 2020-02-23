import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';

import { RemoveFromBasket, UpdateBasketItem } from 'src/app/core/basket/basket.actions';
import { AddToWishList } from 'src/app/core/wish-list/wish-list.actions';

import { IBasketItem } from 'src/lib/interfaces';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketListComponent {
  @Input()
  public itemsList: IBasketItem[];

  public displayedColumns: string[] = ['image', 'name', 'price', 'amount', 'toWantList', 'remove'];

  constructor(private store: Store) {}

  public onRemoveClick(id: number) {
    this.store.dispatch(new RemoveFromBasket(id));
  }

  public onValueChange(amount: number, id: number) {
    const item = this.itemsList.find(element => element.id === id);
    if (item) {
      this.store.dispatch(new UpdateBasketItem({ ...item, amount }));
    }
  }

  public addToWishList(item: IBasketItem) {
    this.store
      .dispatch(new AddToWishList(item.phone))
      .subscribe(() => this.store.dispatch(new RemoveFromBasket(item.id)));
  }
}
