import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

/**
 * NgRx Imports
 */
import { AppState } from 'src/store/AppState';
import * as LoadingActions from 'src/store/loading/loading.actions';
import * as LoginActions from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form: FormGroup;
  loginStateSub: Subscription;
  inputType: string = 'password';

  username: string = 'gusangelis90@gmail.com';
  pas: string = '123456';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private translateService: TranslateService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [this.username, [Validators.required, Validators.email]],
      password: [this.pas, [Validators.required]],
    });

    this.loginStateSub = this.store
      .select('login')
      .subscribe((loginState: LoginState) => {
        this.onHasRecoveredEmailPassword(loginState);
        this.onHasNotRecoveredEmailPassword(loginState);
        this.onIsLoggedIn(loginState);
        this.toggleLoading(loginState);
      });
  }

  onLogin() {
    this.store.dispatch(
      LoginActions.login({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
    );
  }

  onForgotEmailPassword() {
    this.store.dispatch(
      LoginActions.recoverPassword({ email: this.form.get('email')?.value })
    );
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isRecoveringEmailPassword || loginState.isLoggingIn) {
      this.store.dispatch(LoadingActions.show());
    } else {
      this.store.dispatch(LoadingActions.hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  private onHasRecoveredEmailPassword(loginState: LoginState) {
    if (loginState.hasRecoveredEmailPassword) {
      this.successNotification();
    }
  }

  private onHasNotRecoveredEmailPassword(loginState: LoginState) {
    if (loginState.error && !loginState.hasRecoveredEmailPassword) {
      this.failureNotification(loginState.error.message);
      console.log('fire');
    }
  }

  async successNotification() {
    await this.toastController
      .create({
        header: this.translateService.instant(
          'LOGIN.NOTIFICATIONS.SUCCESS_HEADER'
        ),
        message: this.translateService.instant(
          'LOGIN.NOTIFICATIONS.SUCCESS_BODY'
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
          : this.translateService.instant('LOGIN.NOTIFICATIONS.ERROR_BODY'),
        color: 'danger',
        position: 'top',
        duration: 5000,
      })
      .then((toast) => toast.present());
  }

  ngOnDestroy(): void {
    if (this.loginStateSub) this.loginStateSub.unsubscribe();
  }
}
