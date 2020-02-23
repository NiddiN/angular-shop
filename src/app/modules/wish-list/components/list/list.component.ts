import { Component, Input } from '@angular/core';
import { IWishListItem } from 'src/lib/interfaces';
import { Store } from '@ngxs/store';
import { RemoveFromWishList } from 'src/app/core/wish-list/wish-list.actions';
import { AddToBasket } from 'src/app/core/basket/basket.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input()
  public itemsList: IWishListItem[];

  public displayedColumns: string[] = ['image', 'name', 'price', 'toBasket', 'remove'];

  constructor(private store: Store) {}

  public onRemoveClick(id: number) {
    this.store.dispatch(new RemoveFromWishList(id));
  }

  public addToBasket(item: IWishListItem) {
    this.store
      .dispatch(new AddToBasket(item.phone, 1))
      .subscribe(() => this.store.dispatch(new RemoveFromWishList(item.id)));
  }
}
