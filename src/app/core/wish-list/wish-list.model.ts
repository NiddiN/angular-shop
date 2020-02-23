import { IWishListItem } from 'src/lib/interfaces';

export interface WishListStateModel {
  wishList: IWishListItem[];
  amount: number;
  loading: boolean;
}
