import { IOrderPersonalInfo } from './order-personal-info.interface';
import { IBasketItem } from './basket-item.interface';

export interface IOrderInfo {
  personalInfo: IOrderPersonalInfo;
  order: IBasketItem[];
}
