import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  loginSub: Subscription;
  recoverEmailSub: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthService,
    private translateService: TranslateService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginStateSub = this.store
      .select('login')
      .subscribe((loginState: LoginState) => {
        this.onIsRecoveringEmailPassword(loginState);
        this.onHasRecoveredEmailPassword(loginState);
        this.onHasNotRecoveredEmailPassword(loginState);
        this.onIsLoggingIn(loginState);
        this.onIsLoggedIn(loginState);
        this.toggleLoading(loginState);
      });
    // MOVE THIS PART TO REGISTER PAGE
    // this.subscription = this.form.controls['password'].valueChanges.subscribe(
    //   (value) => {
    //     this.password = value;
    //   }
    // );
  }

  onLogin() {
    //Authorize before login
    this.store.dispatch(LoginActions.login());
  }

  onForgotEmailPassword() {
    this.store.dispatch(LoginActions.recoverPassword());
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

  private onIsLoggingIn(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.loginSub = this.authService.login(email, password).subscribe(
        (user) => {
          this.store.dispatch(LoginActions.loginSuccess({ user }));
          console.log(user);
        },
        (error) => {
          this.store.dispatch(LoginActions.loginFailure({ error }));
          console.log(error);
        }
      );
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  private onIsRecoveringEmailPassword(loginState: LoginState) {
    if (loginState.isRecoveringEmailPassword) {
      this.recoverEmailSub = this.authService
        .recoverEmailPassword(this.form.get('email')?.value)
        .subscribe(
          () => {
            this.store.dispatch(LoginActions.recoverPasswordSuccess());
          },
          (error) => {
            this.store.dispatch(LoginActions.recoverPasswordFailure({ error }));
          }
        );
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
        header: this.translateService.instant(
          'LOGIN.NOTIFICATIONS.ERROR_HEADER'
        ),
        message: message
          ? message
          : this.translateService.instant('LOGIN.NOTIFICATIONS.ERROR_BODY'),
        color: 'danger',
        position: 'top',
        duration: 3000,
      })
      .then((toast) => toast.present());
  }

  ngOnDestroy(): void {
    this.loginStateSub.unsubscribe();
    this.loginSub.unsubscribe();
    this.recoverEmailSub.unsubscribe();
  }
}
