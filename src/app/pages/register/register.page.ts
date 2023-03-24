import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  password: string;
  inputType: string = 'password';
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      phoneNumber: ['', [Validators.required]],
      addressInfo: this.formBuilder.group({
        address: ['', [Validators.required]],
        addressNumber: ['', [Validators.required]],
        area: ['', [Validators.required]],
        complement: [''],
        zipCode: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      }),
    });
    this.subscription = this.form.controls['password'].valueChanges.subscribe(
      (value) => {
        this.password = value;
        this.form
          .get('confirmPassword')
          ?.setValidators(this.confirmPassword(this.form));
        this.form.get('confirmPassword')?.updateValueAndValidity();
      }
    );
  }

  onRegister() {
    //Authorize before registering
    this.router.navigate(['home']);
  }

  confirmPassword(form: FormGroup): ValidatorFn {
    const confirmPassword = form.get('confirmPassword');

    const validator = () => {
      return this.password == confirmPassword?.value ? null : { noMatch: true };
    };
    return validator;
  }

  togglePassword() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
