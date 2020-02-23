import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inline-form-field',
  templateUrl: './inline-form-field.component.html',
  styleUrls: ['./inline-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineFormFieldComponent implements OnInit {
  @Input()
  public value: number | string;

  @Output()
  public valueChanged = new EventEmitter<number | string>();

  public changedValue: number | string;

  public isEdit = false;

  ngOnInit() {
    this.changedValue = this.value;
  }

  public switchView(save?: boolean) {
    if (save && this.value !== this.changedValue) {
      this.valueChanged.emit(+this.changedValue);
    } else {
      this.changedValue = this.value;
    }

    this.isEdit = !this.isEdit;
  }
}
