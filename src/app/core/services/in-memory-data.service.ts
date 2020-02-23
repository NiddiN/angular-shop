import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IPhone, IBasketItem, IWishListItem } from 'src/lib/interfaces';
import { Phones } from 'src/lib/mocks';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const phones: IPhone[] = Phones;
    const basket: IBasketItem[] = [
      {
        id: 1,
        amount: 2,
        phone: Phones[0]
      }
    ];
    const wishList: IWishListItem[] = [
      {
        id: 1,
        phone: Phones[3],
        time: new Date()
      }
    ];

    return { phones, basket, wishList };
  }

  genId(list: any[]): number {
    return list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
  }
}
