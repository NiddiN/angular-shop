import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { BasketState } from 'src/app/core/basket/basket.state';
import { Observable } from 'rxjs';
import { IBasketItem } from 'src/lib/interfaces';

@Component({
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketPage {
  @Select(BasketState.basket)
  public basket$: Observable<IBasketItem[]>;

  @Select(BasketState.amount)
  public amount$: Observable<number>;
}
