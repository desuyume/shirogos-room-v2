import Chronicles from '../pages/Chronicles'
import Dangoteka from '../pages/Dangoteka'
import Main from '../pages/Main';
import Room from '../pages/Room'
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
]