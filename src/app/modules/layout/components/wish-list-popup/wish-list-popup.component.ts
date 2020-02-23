import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { WishListState } from 'src/app/core/wish-list/wish-list.state';

import { IWishListItem } from 'src/lib/interfaces';

@Component({
  selector: 'app-wish-list-popup',
  templateUrl: './wish-list-popup.component.html',
  styleUrls: ['./wish-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPopupComponent {
  @Select(WishListState.amount)
  public amount$: Observable<number>;

  @Select(WishListState.lastAdded)
  public lastAdded$: Observable<IWishListItem[]>;

  public isPopupShowed = false;
}
