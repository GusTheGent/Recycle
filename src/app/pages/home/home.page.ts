import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username$: Observable<LoginState>;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.username$ = this.store.select('login');
  }

  onGotoPickupCalls() {
    this.router.navigate(['pickup-calls']);
  }

  onCreateNewPickupCall() {
    this.router.navigate(['pickup-call']);
  }
}
