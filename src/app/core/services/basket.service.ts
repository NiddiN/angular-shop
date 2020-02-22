import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBasketItem, IPhone } from 'src/lib/interfaces';
import { Observable } from 'rxjs';

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

  public removeFromBasket(id: number): Observable<IBasketItem> {
    return this.httpClient.delete<IBasketItem>(`${API_URL}/${id}`);
  }
}
