import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';

import { WishListState } from 'src/app/core/wish-list/wish-list.state';

import { Observable } from 'rxjs';

import { IWishListItem } from 'src/lib/interfaces';

@Component({
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListPage {
  @Select(WishListState.wishList)
  public wishList$: Observable<IWishListItem[]>;
}
