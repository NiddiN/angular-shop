import { IPhone } from './phone.interface';

export interface IWishListItem {
  id: number;
  phone: IPhone;
  time: Date;
}
