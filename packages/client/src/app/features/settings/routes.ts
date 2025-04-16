export const settingsRoutePaths = {
    PROFILE: 'profile',
}

export const settingsRoutes = [
    {
        path: settingsRoutePaths.PROFILE,
        loadComponent: () => import('@features/settings/profile/profile.component').then(c => c.ProfileComponent),
    }
]