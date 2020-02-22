import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPhone } from 'src/lib/interfaces';

const API_URL = 'api/phones';

@Injectable()
export class PhoneService {
  constructor(private httpClient: HttpClient) {}

  public getPhones(): Observable<IPhone[]> {
    return this.httpClient.get<IPhone[]>(API_URL);
  }
}
