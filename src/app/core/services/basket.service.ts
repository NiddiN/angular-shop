import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBasketItem, IPhone } from 'src/lib/interfaces';

const API_URL = 'api/basket';

@Injectable()
export class BasketService {
  constructor(private httpClient: HttpClient) {}

  public getBasket(): Observable<IBasketItem[]> {
    return this.httpClient.get<IBasketItem[]>(API_URL);
  }

  public addToBasket(phone: IPhone, amount: number): Observable<IBasketItem> {
    return this.httpClient.post<IBasketItem>(API_URL, { phone, amount });
  }

  public removeFromBasket(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${API_URL}/${id}`);
  }

  public upateBasketItem(item: IBasketItem): Observable<null> {
    return this.httpClient.put<null>(`${API_URL}/${item.id}`, item);
  }
}
