import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IPhone } from 'src/lib/interfaces';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {
  @Input()
  public phone: IPhone;

  constructor() {}
}
