import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { BasketState } from 'src/app/core/basket/basket.state';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { IBasketItem, IOrderPersonalInfo, IOrderInfo } from 'src/lib/interfaces';
import { map, filter, tap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketPage implements OnDestroy {
  @Select(BasketState.basket)
  public basket$: Observable<IBasketItem[]>;

  @Select(BasketState.amount)
  public amount$: Observable<number>;

  public $updateOrder = new BehaviorSubject<IOrderPersonalInfo | null>(null);

  public orderInfo$: Observable<IOrderInfo>;

  constructor() {
    this.orderInfo$ = combineLatest([this.$updateOrder.asObservable(), this.basket$]).pipe(
      untilDestroyed(this),
      filter(([info]) => !!info),
      map(([info, order]) => ({ personalInfo: info, order })),
      tap(r => console.log(r))
    );
  }

  ngOnDestroy() {}

  public onFormSubmit(personalInfo: IOrderPersonalInfo) {
    this.$updateOrder.next(personalInfo);
  }
}
