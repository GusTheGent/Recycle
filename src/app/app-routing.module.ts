import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from './guards/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
  {
    path: 'loader',
    loadChildren: () =>
      import('./pages/loader/loader.module').then((m) => m.LoaderPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'pickup-call',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/pickup-call/pickup-call.module').then(
        (m) => m.PickupCallPageModule
      ),
  },
  {
    path: 'pickup-calls',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/pickup-calls/pickup-calls.module').then(
        (m) => m.PickupCallsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TranslateModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
