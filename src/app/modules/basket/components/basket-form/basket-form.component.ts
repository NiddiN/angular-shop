import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { emailMask } from 'text-mask-addons';
import { PHONE_MASK } from 'src/lib/masks/phone.mask';
import { IOrderPersonalInfo } from 'src/lib/interfaces';

@Component({
  selector: 'app-basket-form',
  templateUrl: './basket-form.component.html',
  styleUrls: ['./basket-form.component.scss']
})
export class BasketFormComponent {
  @Output()
  public formSubmited = new EventEmitter<IOrderPersonalInfo>();

  public readonly emailMask = emailMask;
  public readonly phoneMask = PHONE_MASK;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.formSubmited.emit(this.form.value);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-.]+@[a-z]+\.[a-z]+$/)]),
      address: new FormControl('', [Validators.required]),
      comment: new FormControl()
    });
  }
}
