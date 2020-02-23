import { Injectable, NgZone } from '@angular/core';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';

import {
  LoadWishList,
  AddToWishList,
  OperationSuccess,
  OperationFailed,
  RemoveFromWishList
} from './wish-list.actions';

import { WishListService } from '../services';
import { MatSnackBar } from '@angular/material/snack-bar';

import { tap, catchError } from 'rxjs/operators';

import { WishListStateModel } from './wish-list.model';
import { IWishListItem } from 'src/lib/interfaces';

@Injectable()
@State({
  name: 'wishList',
  defaults: {
    wishList: [],
    amount: 0,
    loading: false
  }
})
export class WishListState implements NgxsOnInit {
  constructor(private wishListService: WishListService, private snackBar: MatSnackBar, private ngZone: NgZone) {}

  /*
    Selectors
  */

  @Selector()
  public static wishList({ wishList }: WishListStateModel) {
    return wishList;
  }

  @Selector()
  public static amount({ amount }: WishListStateModel) {
    return amount;
  }

  @Selector()
  public static lastAdded({ wishList }: WishListStateModel) {
    return wishList.slice(0, 5);
  }

  /*
    Hooks
  */

  public ngxsOnInit(ctx: StateContext<WishListStateModel>) {
    ctx.dispatch(new LoadWishList());
  }

  /*
    Actions
  */

  @Action(LoadWishList)
  public loadWishList(ctx: StateContext<WishListStateModel>) {
    return this.wishListService.getWishList().pipe(
      tap(wishList => {
        if (wishList) {
          ctx.patchState({
            wishList: this.sortWishList(wishList),
            amount: wishList.length
          });
        }
      })
    );
  }

  @Action(AddToWishList)
  public addToWishList(ctx: StateContext<WishListStateModel>, { phone }: AddToWishList) {
    ctx.patchState({ loading: true });
    const state = ctx.getState();
    return this.wishListService.addToWishList(phone).pipe(
      tap(wishListItem => {
        const wishList = [...state.wishList, wishListItem];
        const newBasketItem = {
          wishList: this.sortWishList(wishList),
          amount: wishList.length
        };
        ctx.patchState(newBasketItem);
        ctx.dispatch(new OperationSuccess('Товар добавлен в список желаний'));
      }),
      catchError(() => ctx.dispatch(new OperationFailed('Упс, что-то пошло не так :(')))
    );
  }

  @Action(RemoveFromWishList)
  public removeFromWishList(ctx: StateContext<WishListStateModel>, { id }: RemoveFromWishList) {
    const state = ctx.getState();
    return this.wishListService.removeFromWishList(id).pipe(
      tap(() => {
        const wishList = state.wishList.filter(item => item.id !== id);
        ctx.patchState({
          wishList: this.sortWishList(wishList),
          amount: wishList.length
        });
        ctx.dispatch(new OperationSuccess('Товар удален из списка желаний'));
      }),
      catchError(() => ctx.dispatch(new OperationFailed('Упс, что-то пошло не так :(')))
    );
  }

  /*
    Notice actions
  */

  @Action(OperationSuccess)
  public operationSuccess(ctx: StateContext<WishListStateModel>, { message }: OperationSuccess) {
    this.ngZone.run(() => this.snackBar.open(message));
    return ctx.patchState({ loading: false });
  }

  @Action(OperationFailed)
  public operationFailed(ctx: StateContext<WishListStateModel>, { message }: OperationFailed) {
    this.ngZone.run(() => this.snackBar.open(message, '', { panelClass: 'error-snackbar' }));
    return ctx.patchState({ loading: false });
  }

  /*
    Methods
  */

  private sortWishList(wishList: IWishListItem[]): IWishListItem[] {
    return wishList.length ? wishList.sort((a, b) => (a.time > b.time ? -1 : 1)) : wishList;
  }
}
