import { routePaths } from '@app/routes'
import { collectionRoutePaths } from '@features/collection/routes'

export type NavItem = {
    icon?: string
    label: string
    uri: string
    children?: NavItem[]
}

export const navItems: NavItem[] = [
    {
        icon: 'phosphorVinylRecord',
        label: 'Collection',
        uri: `/${routePaths.COLLECTION}`,
        children: [
            {
                label: 'Records',
                uri: `/${routePaths.COLLECTION}`,
            },
            {
                label: 'Share Links',
                uri: `/${routePaths.COLLECTION}/${collectionRoutePaths.SHARE_LINKS}`,
            }
        ]
    }
]