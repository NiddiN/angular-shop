import { IPhone } from './phone.interface';

export interface ICatalogItem {
  phone: IPhone;
  isInWishList: boolean;
  wishId: number;
}
