import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { BasketState } from 'src/app/core/basket/basket.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(BasketState.fullPrice)
  public fullPrice$: Observable<number>;

  @Select(BasketState.amount)
  public amount$: Observable<number>;
}
