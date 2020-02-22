import { IBasketItem } from 'src/lib/interfaces';

export interface BasketStateModel {
  basket: IBasketItem[];
  fullPrice: number;
  amount: number;
  loading: boolean;
}
