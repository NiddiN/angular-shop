import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IPhone } from 'src/lib/interfaces';
import { Phones } from 'src/lib/mocks';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const phones = Phones;
    const basket = [];
    return { phones, basket };
  }

  genId(phones: IPhone[]): number {
    return phones.length > 0 ? Math.max(...phones.map(phone => phone.id)) + 1 : 1;
  }
}
