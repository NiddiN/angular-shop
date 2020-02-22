import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { tap, catchError } from 'rxjs/operators';

import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { BasketStateModel } from './basket.model';
import { LoadBasket, AddToBasket, OperationSuccess, OperationFailed } from './basket.actions';

import { BasketService } from '../services';

@Injectable()
@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    basket: [],
    fullPrice: 0,
    amount: 0,
    loading: false
  }
})
export class BasketState implements NgxsOnInit {
  constructor(private basketService: BasketService, private snackBar: MatSnackBar) {}

  @Selector()
  public static basket({ basket }: BasketStateModel) {
    return basket;
  }

  @Selector()
  public static fullPrice({ fullPrice }: BasketStateModel) {
    return fullPrice;
  }

  @Selector()
  public static amount({ amount }: BasketStateModel) {
    return amount;
  }

  public ngxsOnInit(ctx: StateContext<BasketStateModel>) {
    ctx.dispatch(new LoadBasket());
  }

  @Action(LoadBasket)
  public loadBasket(ctx: StateContext<BasketStateModel>) {
    return this.basketService.getBasket().pipe(
      tap(basket => {
        if (basket) {
          const priceList = basket.map(item => item.phone.price * item.amount);
          const amountList = basket.map(item => item.amount);
          const fullPrice = priceList.length ? priceList.reduce((acc, val) => acc + val) : 0;
          const amount = amountList.length ? amountList.reduce((acc, val) => acc + val) : 0;
          ctx.patchState({ basket, fullPrice, amount });
        }
      })
    );
  }

  @Action(AddToBasket)
  public addToBasket(ctx: StateContext<BasketStateModel>, { phone, amount }: AddToBasket) {
    ctx.patchState({ loading: true });
    const state = ctx.getState();
    return this.basketService.addToBasket(phone, amount).pipe(
      tap(basketItem => {
        const basket = [...state.basket, basketItem];
        const newBasketItem = {
          basket,
          fullPrice: basket.map(item => item.phone.price * item.amount).reduce((acc, val) => acc + val),
          amount: basket.map(item => item.amount).reduce((acc, val) => acc + val)
        };
        ctx.patchState(newBasketItem);
        ctx.dispatch(new OperationSuccess('Товар добавлен в корзину'));
      }),
      catchError(() => ctx.dispatch(new OperationFailed('Упс, что-то пошло не так :(')))
    );
  }

  @Action(OperationSuccess)
  public operationSuccess(ctx: StateContext<BasketStateModel>, { message }: OperationSuccess) {
    this.snackBar.open(message, '');
    return ctx.patchState({ loading: false });
  }

  @Action(OperationFailed)
  public operationFailed(ctx: StateContext<BasketStateModel>, { message }: OperationFailed) {
    this.snackBar.open(message, '', { panelClass: 'error-snackbar' });
    return ctx.patchState({ loading: false });
  }
}
