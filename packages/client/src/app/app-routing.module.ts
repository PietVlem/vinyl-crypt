import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'settings/profile',
    loadComponent: () => import('@features/settings/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'public',
    loadComponent: () => import('@features/public/public.component').then(c => c.PublicComponent),
  },
  {
    path: 'protected',
    loadComponent: () => import('@features/protected/protected.component').then(c => c.ProtectedComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'callback',
    loadComponent: () => import('@features/callback/callback.component').then(c => c.CallbackComponent),
  },
  {
    path: 'error',
    loadComponent: () => import('@core/pages/error/error.component').then(c => c.ErrorComponent)
  },
  {
    path: '**',
    loadComponent: () => import('@core/pages/error/error.component').then(c => c.ErrorComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }