import { IPhone } from 'src/lib/interfaces';

export class LoadWishList {
  public static readonly type = '[Wish list] Load wish list';
}

export class AddToWishList {
  public static readonly type = '[Wish list] Add to wish list';
  constructor(public readonly phone: IPhone) {}
}

export class RemoveFromWishList {
  public static readonly type = '[Wish list] Remove from wish list';
  constructor(public readonly id: number) {}
}

export class OperationSuccess {
  public static readonly type = '[Wish list] Operation success';
  constructor(public readonly message: string) {}
}

export class OperationFailed {
  public static readonly type = '[Wish list] Operation failed';
  constructor(public readonly message: string) {}
}
