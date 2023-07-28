import Chronicles from '../pages/Chronicles'
import Dangoteka from '../pages/Dangoteka'
import Main from '../pages/Main';
import Manga from '../pages/Manga'
import Room from '../pages/Room'
import Story from '../pages/Story'
import Wiki from '../pages/Wiki'
import Youtubes from '../pages/Youtubes'
import { IRoute } from '../types/types'

export const routes: IRoute[] = [
	{ path: '/', element: <Main /> },
	{ path: '/room', element: <Room /> },
	{ path: '/wiki', element: <Wiki /> },
	{ path: '/dangoteka', element: <Dangoteka /> },
	{ path: '/youtubes', element: <Youtubes /> },
	{ path: '/chronicles', element: <Chronicles /> },
	{ path: '/manga/:id/:chapter?', element: <Manga /> },
	{ path: '/story/:id/:chapter?', element: <Story /> },
]