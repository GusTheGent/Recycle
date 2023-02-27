import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  password!: string;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

  onForgotEmailPassword() {
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000);
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
