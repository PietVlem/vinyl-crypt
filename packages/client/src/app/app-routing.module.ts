import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { collectionRoutes } from '@features/collection/routes';
import { settingsRoutes } from '@features/settings/routes';

export const routePaths = {
  COLLECTION: 'collection',
  SETTINGS: 'settings',
  CALLBACK: 'callback',
  ERROR: 'error',
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: routePaths.COLLECTION,
    canActivate: [AuthGuard],
    children: [...collectionRoutes]
  },
  {
    path: routePaths.SETTINGS,
    loadComponent: () => import('@features/settings/settings.component').then(c => c.SettingsComponent),
    canActivate: [AuthGuard],
    children: [...settingsRoutes]
  },
  {
    path: routePaths.CALLBACK,
    loadComponent: () => import('@core/pages/callback/callback.component').then(c => c.CallbackComponent),
  },
  {
    path: routePaths.ERROR,
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