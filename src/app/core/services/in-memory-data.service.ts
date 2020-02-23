import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IPhone, IBasketItem } from 'src/lib/interfaces';
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

    return { phones, basket };
  }

  genId(list: IBasketItem[]): number {
    return list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1;
  }
}
