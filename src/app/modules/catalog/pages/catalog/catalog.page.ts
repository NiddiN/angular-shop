import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';

import { PhoneService } from 'src/app/core/services';

import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

import { WishListState } from 'src/app/core/wish-list/wish-list.state';

import { IWishListItem, ICatalogItem } from 'src/lib/interfaces';

@Component({
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPage {
  @Select(WishListState.wishList)
  public wishList$: Observable<IWishListItem[]>;

  public catalog$: Observable<ICatalogItem[]>;

  constructor(private phoneService: PhoneService) {
    this.catalog$ = this.phoneService.getPhones().pipe(
      combineLatest(this.wishList$),
      map(([phones, wishList]) =>
        phones.map(phone => {
          const wishItem = wishList.find(item => item.phone.id === phone.id);
          return { phone, isInWishList: !!wishItem, wishId: wishItem?.id };
        })
      )
    );
  }
}
