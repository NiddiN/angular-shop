import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PhoneService } from 'src/app/core/services';
import { IPhone } from 'src/lib/interfaces';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPage {
  public phones$: Observable<IPhone[]>;

  constructor(private phoneService: PhoneService) {
    this.phones$ = this.phoneService.getPhones();
  }
}
