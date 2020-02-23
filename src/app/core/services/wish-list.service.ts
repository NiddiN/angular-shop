import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IWishListItem, IPhone } from 'src/lib/interfaces';

const API_URL = 'api/wishList';

@Injectable()
export class WishListService {
  constructor(private httpClient: HttpClient) {}

  public getWishList(): Observable<IWishListItem[]> {
    return this.httpClient.get<IWishListItem[]>(API_URL);
  }

  public addToWishList(phone: IPhone): Observable<IWishListItem> {
    return this.httpClient.post<IWishListItem>(API_URL, { phone, time: new Date() });
  }

  public removeFromWishList(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${API_URL}/${id}`);
  }
}
