export const dashboardRoutePaths = {
    COLLECTION: 'collection',
    SHARE_LINKS: 'share-links',
}

export const dashboardRoutes = [
    {
        path: dashboardRoutePaths.COLLECTION,
        loadComponent: () => 
            import('@features/dashboard/pages/collection/collection.component').then(c => c.CollectionComponent),
    },
    {
        path: dashboardRoutePaths.SHARE_LINKS,
        loadComponent: () =>
            import('@features/dashboard/pages/share-links/share-links.component').then(c => c.ShareLinksComponent),
    }
]