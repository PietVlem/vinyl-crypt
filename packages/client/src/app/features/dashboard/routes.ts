export const dashboardRoutes = [
    {
        path: 'collection',
        loadComponent: () => import('@features/dashboard/collection/collection.component').then(c => c.CollectionComponent),
    }
]