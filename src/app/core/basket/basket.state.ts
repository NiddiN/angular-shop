import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { tap, catchError } from 'rxjs/operators';

import { State, NgxsOnInit, Selector, Action, StateContext } from '@ngxs/store';
import { BasketStateModel } from './basket.model';
import {
  LoadBasket,
  AddToBasket,
  OperationSuccess,
  OperationFailed,
  RemoveFromBasket,
  UpdateBasketItem
} from './basket.actions';

import { BasketService } from '../services';
import { IBasketItem } from 'src/lib/interfaces';

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
  constructor(private basketService: BasketService, private snackBar: MatSnackBar, private ngZone: NgZone) {}

  /*
    Selectors
  */

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

  /*
    Hooks
  */

  public ngxsOnInit(ctx: StateContext<BasketStateModel>) {
    ctx.dispatch(new LoadBasket());
  }

  /*
    Actions
  */

  @Action(LoadBasket)
  public loadBasket(ctx: StateContext<BasketStateModel>) {
    return this.basketService.getBasket().pipe(
      tap(basket => {
        if (basket) {
          ctx.patchState({
            basket,
            fullPrice: this.calcPrice(basket),
            amount: this.calcAmount(basket)
          });
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
          fullPrice: this.calcPrice(basket),
          amount: this.calcAmount(basket)
        };
        ctx.patchState(newBasketItem);
        ctx.dispatch(new OperationSuccess('Товар добавлен в корзину'));
      }),
      catchError(() => ctx.dispatch(new OperationFailed('Упс, что-то пошло не так :(')))
    );
  }

  @Action(RemoveFromBasket)
  public removeFromBasket(ctx: StateContext<BasketStateModel>, { id }: RemoveFromBasket) {
    const state = ctx.getState();
    return this.basketService.removeFromBasket(id).pipe(
      tap(() => {
        const basket = state.basket.filter(item => item.id !== id);
        ctx.patchState({
          basket,
          fullPrice: this.calcPrice(basket),
          amount: this.calcAmount(basket)
        });
        ctx.dispatch(new OperationSuccess('Товар удален из корзины'));
      }),
      catchError(() => ctx.dispatch(new OperationFailed('Упс, что-то пошло не так :(')))
    );
  }

  @Action(UpdateBasketItem)
  public updateBasketItem(ctx: StateContext<BasketStateModel>, { item }: UpdateBasketItem) {
    ctx.patchState({ loading: true });
    const state = ctx.getState();
    return this.basketService.upateBasketItem(item).pipe(
      tap(() => {
        const basket = state.basket.slice();
        const itemIndex = basket.findIndex(element => element.id === item.id);

        if (itemIndex !== -1) {
          basket[itemIndex] = item;
        }

        ctx.patchState({
          basket,
          fullPrice: this.calcPrice(basket),
          amount: this.calcAmount(basket)
        });
        ctx.dispatch(new OperationSuccess('Количество товара изменено'));
      }),
      catchError(() => ctx.dispatch(new OperationFailed('Упс, что-то пошло не так :(')))
    );
  }

  /*
    Notice actions
  */

  @Action(OperationSuccess)
  public operationSuccess(ctx: StateContext<BasketStateModel>, { message }: OperationSuccess) {
    this.ngZone.run(() => this.snackBar.open(message));
    return ctx.patchState({ loading: false });
  }

  @Action(OperationFailed)
  public operationFailed(ctx: StateContext<BasketStateModel>, { message }: OperationFailed) {
    this.ngZone.run(() => this.snackBar.open(message, '', { panelClass: 'error-snackbar' }));
    return ctx.patchState({ loading: false });
  }

  /*
    Methods
  */

  private calcPrice(basket: IBasketItem[]): number {
    return basket.length ? basket.map(item => item.phone.price * item.amount).reduce((acc, val) => acc + val) : 0;
  }

  private calcAmount(basket: IBasketItem[]): number {
    return basket.length ? basket.map(item => item.amount).reduce((acc, val) => acc + val) : 0;
  }
}
