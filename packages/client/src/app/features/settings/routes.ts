export const settingsRoutes = [
    {
        path: 'profile',
        loadComponent: () => import('@features/settings/profile/profile.component').then(c => c.ProfileComponent),
    }
]