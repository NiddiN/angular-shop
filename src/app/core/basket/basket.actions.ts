import { IPhone } from 'src/lib/interfaces';

export class LoadBasket {
  public static readonly type = '[Basket] Load basket';
}

export class AddToBasket {
  public static readonly type = '[Basket] Add to basket';
  constructor(public readonly phone: IPhone, public readonly amount: number) {}
}

export class RemoveFromBasket {
  public static readonly type = '[Basket] Remove from basket';
  constructor(public readonly id: number) {}
}

export class OperationSuccess {
  public static readonly type = '[Basket] Operation success';
  constructor(public readonly message: string) {}
}

export class OperationFailed {
  public static readonly type = '[Basket] Operation failed';
  constructor(public readonly message: string) {}
}
