export const dashboardRoutePaths = {
    COLLECTION: 'collection',
}

export const dashboardRoutes = [
    {
        path: dashboardRoutePaths.COLLECTION,
        loadComponent: () => import('@features/dashboard/collection/collection.component').then(c => c.CollectionComponent),
    }
]