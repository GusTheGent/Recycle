import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  password!: string;
  subscription!: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.subscription = this.form.controls['password'].valueChanges.subscribe(
      (value) => {
        this.password = value;
      }
    );
  }

  onLogin() {
    //Authorize before login
    this.router.navigate(['home']);
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
