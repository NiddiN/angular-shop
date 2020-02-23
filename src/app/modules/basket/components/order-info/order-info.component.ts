import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IOrderInfo } from 'src/lib/interfaces';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInfoComponent {
  @Input()
  public set orderInfo(orderInfo: IOrderInfo) {
    if (orderInfo) {
      this.info = JSON.stringify(orderInfo);
    }
  }

  public info: string;
}
