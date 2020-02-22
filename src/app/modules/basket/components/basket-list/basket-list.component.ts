import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IBasketItem } from 'src/lib/interfaces';
import { Store } from '@ngxs/store';
import { RemoveFromBasket } from 'src/app/core/basket/basket.actions';

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
}
