import CreateRoom from '@/pages/CreateRoom'
import Dangoteka from '@/pages/Dangoteka'
import Main from '@/pages/Main';
import Manga from '@/pages/Manga'
import Room from '@/pages/Room'
import Story from '@/pages/Story'
import Wiki from '@/pages/Wiki'
import WikiReader from '@/pages/WikiReader'
import Youtubes from '@/pages/Youtubes'
import { IRoute } from '@/types/types'
import { adminRoutes } from './adminRoutes'
import Admin from '@/pages/Admin/Admin'

export const routes: IRoute[] = [
	{ path: '/', element: <Main /> },
	{ path: '/room', element: <Room /> },
	{ path: '/room/:section', element: <Room /> },
	{ path: '/room/boutique/:section', element: <Room /> },
	{ path: '/wiki', element: <Wiki /> },
	{ path: '/dangoteka', element: <Dangoteka /> },
	{ path: '/youtubes', element: <Youtubes /> },
	{ path: '/manga/:id/:chapter?', element: <Manga /> },
	{ path: '/story/:id/:chapter?', element: <Story /> },
	{ path: '/room/create', element: <CreateRoom /> },
	{ path: '/wiki/:id', element: <WikiReader /> },
	{ path: '/admin', element: <Admin /> },
]

for (const route of adminRoutes) {
	routes.push({ path: `/admin${route.path}`, element: route.element })
}