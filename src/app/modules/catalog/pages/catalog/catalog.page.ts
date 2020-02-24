import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';

import { PhoneService } from 'src/app/core/services';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { WishListState } from 'src/app/core/wish-list/wish-list.state';

import { IWishListItem, ICatalogItem } from 'src/lib/interfaces';

@Component({
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPage implements OnDestroy {
  @Select(WishListState.wishList)
  public wishList$: Observable<IWishListItem[]>;

  public catalog$: Observable<ICatalogItem[]>;

  constructor(private phoneService: PhoneService) {
    this.catalog$ = combineLatest([this.phoneService.getPhones(), this.wishList$]).pipe(
      untilDestroyed(this),
      map(([phones, wishList]) =>
        phones.map(phone => {
          const wishItem = wishList.find(item => item.phone.id === phone.id);
          return { phone, isInWishList: !!wishItem, wishId: wishItem?.id };
        })
      )
    );
  }

  ngOnDestroy() {}
}
