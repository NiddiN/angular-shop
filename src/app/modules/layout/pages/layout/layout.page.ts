import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { BasketState } from 'src/app/core/basket/basket.state';
import { Observable, combineLatest } from 'rxjs';
import { WishListState } from 'src/app/core/wish-list/wish-list.state';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPage implements OnInit {
  @Select(BasketState.loading)
  public basketLoading$: Observable<boolean>;

  @Select(WishListState.loading)
  public wishListtLoading$: Observable<boolean>;

  public loading$: Observable<boolean>;

  ngOnInit() {
    this.loading$ = combineLatest([this.basketLoading$, this.wishListtLoading$]).pipe(
      map(result => result.reduce((acc, val) => acc || val))
    );
  }
}
