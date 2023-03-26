import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * NgRx Imports
 */
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { RegisterState } from 'src/store/register/RegisterState';
import * as RegisterActions from 'src/store/register/register.actions';
import * as LoadingActions from 'src/store/loading/loading.actions';
import * as LoginActions from 'src/store/login/login.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  registerStateSub: Subscription;
  password: string;
  inputType: string = 'password';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private translateService: TranslateService,
    private store: Store<AppState>
  ) {}

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
    this.watchRegisterState();
  }

  onRegister() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(
        RegisterActions.register({
          userRegister: this.form.value,
        })
      );
    }
  }

  confirmPassword(form: FormGroup): ValidatorFn {
    const confirmPassword = form.get('confirmPassword');

    const validator = () => {
      return this.password == confirmPassword?.value ? null : { noMatch: true };
    };
    return validator;
  }

  watchRegisterState() {
    this.registerStateSub = this.store
      .select('register')
      .subscribe((registerState: RegisterState) => {
        this.toggleLoading(registerState);
        this.registerSuccess(registerState);
        this.registerFailure(registerState);
      });
  }

  private toggleLoading(registerState: RegisterState) {
    if (registerState.isRegistering) {
      this.store.dispatch(LoadingActions.show());
    } else {
      this.store.dispatch(LoadingActions.hide());
    }
  }

  private registerSuccess(registerState: RegisterState) {
    if (registerState.isRegistered && !registerState.error) {
      this.successNotification();
      setTimeout(() => {
        this.store.dispatch(
          LoginActions.login({
            email: this.form.get('email')?.value,
            password: this.password,
          })
        );
      }, 3000);
      this.router.navigate(['home']);
    }
  }
  private registerFailure(registerState: RegisterState) {
    if (!registerState.isRegistered && registerState.error) {
      this.failureNotification(registerState.error.message);
    }
  }

  async successNotification() {
    await this.toastController
      .create({
        header: this.translateService.instant(
          'REGISTER.NOTIFICATIONS.SUCCESS_HEADER'
        ),
        color: 'primary',
        position: 'top',
        cssClass: 'success-toast',
        buttons: [
          {
            icon: 'checkmark-circle',
            side: 'end',
          },
        ],
        duration: 3000,
      })
      .then((toast) => toast.present());
  }

  async failureNotification(message?: string) {
    await this.toastController
      .create({
        message: message
          ? message
          : this.translateService.instant(
              'REGISTER.NOTIFICATIONS.ERROR_HEADER'
            ),
        color: 'danger',
        position: 'top',
        duration: 5000,
      })
      .then((toast) => toast.present());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.registerStateSub.unsubscribe();
  }
}
