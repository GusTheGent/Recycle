import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { AppState } from 'src/store/AppState';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private store: Store<AppState>, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap((state) => {
        if (state.isLoggedIn) {
          return of(true);
        } else {
          this.router.navigateByUrl('login');
          return of(false);
        }
      })
    );
  }
}
