import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guards';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@features/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('@features/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('@features/dashboard/dashboard.component').then(c => c.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'error',
        loadComponent: () => import('@features/error/error.component').then(c => c.ErrorComponent)
    },
    {
        path: '**',
        loadComponent: () => import('@features/error/error.component').then(c => c.ErrorComponent)
    }
];
