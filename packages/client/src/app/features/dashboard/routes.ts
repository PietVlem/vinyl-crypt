export const dashboardRoutePaths = {
    COLLECTION: 'collection',
}

export const dashboardRoutes = [
    {
        path: dashboardRoutePaths.COLLECTION,
        loadComponent: () => 
            import('@features/dashboard/pages/collection/collection.component').then(c => c.CollectionComponent),
    }
]