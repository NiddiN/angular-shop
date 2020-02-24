import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';

import { BasketState } from 'src/app/core/basket/basket.state';
import { WishListState } from 'src/app/core/wish-list/wish-list.state';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPage implements OnInit, OnDestroy {
  @Select(BasketState.loading)
  public basketLoading$: Observable<boolean>;

  @Select(WishListState.loading)
  public wishListtLoading$: Observable<boolean>;

  public loading$: Observable<boolean>;

  ngOnInit() {
    this.loading$ = combineLatest([this.basketLoading$, this.wishListtLoading$]).pipe(
      untilDestroyed(this),
      map(result => result.reduce((acc, val) => acc || val))
    );
  }

  ngOnDestroy() {}
}
