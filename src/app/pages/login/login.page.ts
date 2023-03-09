import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
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
  form!: FormGroup;
  password!: string;
  loginStateSub!: Subscription;
  recoverEmailSub!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthService,
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
        this.isRecoveringPassword(loginState);
        this.hasRecoveredPassword(loginState);
        this.hasNotRecoveredPassword(loginState);
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
    this.router.navigate(['home']);
  }

  private isRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(LoadingActions.show());
      this.recoverEmailSub = this.authService
        .recoverEmail(this.form.get('email')?.value)
        .subscribe(
          () => {
            this.store.dispatch(LoginActions.recoverPasswordSuccess());
            this.store.dispatch(LoadingActions.hide());
          },
          (error) => {
            this.store.dispatch(LoginActions.recoverPasswordFailure({ error }));
            this.store.dispatch(LoadingActions.hide());
          }
        );
    }
  }
  private hasRecoveredPassword(loginState: LoginState) {
    if (loginState.hasRecoveredPassword && !loginState.isRecoveringPassword) {
      this.successNotification();
    }
  }

  private hasNotRecoveredPassword(loginState: LoginState) {
    if (
      loginState.error &&
      !loginState.isRecoveringPassword &&
      !loginState.hasRecoveredPassword
    ) {
      this.failureNotification(loginState.error.message);
    }
  }

  onForgotEmailPassword() {
    this.store.dispatch(LoginActions.recoverPassword());
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  async successNotification(message?: string) {
    await this.toastController
      .create({
        header: 'Email Sent',
        message: 'Check your email',
        color: 'primary',
        position: 'top',
        duration: 3000,
      })
      .then((toast) => toast.present());
  }
  async failureNotification(message?: string) {
    await this.toastController
      .create({
        header: '404 NOT FOUND',
        message: message,
        color: 'danger',
        position: 'top',
        duration: 3000,
      })
      .then((toast) => toast.present());
  }

  ngOnDestroy(): void {
    this.loginStateSub.unsubscribe();
    this.recoverEmailSub.unsubscribe();
  }
}
