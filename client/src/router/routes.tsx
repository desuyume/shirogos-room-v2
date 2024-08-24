import CreateRoom from '@/pages/CreateRoom'
import Dangoteka from '@/pages/Dangoteka'
import Main from '@/pages/Main'
import Manga from '@/pages/Manga'
import Room from '@/pages/Room'
import Story from '@/pages/Story'
import Wiki from '@/pages/Wiki'
import WikiReader from '@/pages/WikiReader'
// import Youtubes from '@/pages/Youtubes'
import Admin from '@/pages/Admin/Admin'
import Streamer from '@/pages/Streamer'
import Guide from '@/pages/Guide'
import Achievements from '@/pages/Admin/Achievements'
import Base from '@/pages/Admin/Base'
import Donates from '@/pages/Admin/Donates'
import Orders from '@/pages/Admin/Orders'
import Tasks from '@/pages/Admin/Tasks'
import Users from '@/pages/Admin/Users'
import Wikiteka from '@/pages/Admin/Wikiteka'
import Customization from '@/pages/Admin/Customization'
import { RouteObject } from 'react-router-dom'

export const publicRouter: RouteObject[] = [
  { path: '/', element: <Main /> },
  { path: '/wiki/:id', element: <WikiReader /> },
  { path: '/wiki', element: <Wiki /> },
  { path: '/dangoteka', element: <Dangoteka /> },
  { path: '/streamer', element: <Streamer /> },
  // { path: '/youtubes', element: <Youtubes /> },
  { path: '/manga/:id/:chapter?', element: <Manga /> },
  { path: '/story/:id/:chapter?', element: <Story /> },
  { path: '/guide/:twitchLogin', element: <Guide /> }
]

export const privateRouter: RouteObject[] = [
  { path: '/room', element: <Room /> },
  { path: '/room/create', element: <CreateRoom /> },
  { path: '/room/:section', element: <Room /> },
  { path: '/room/boutique/:section', element: <Room /> }
]

export const adminRouter: RouteObject[] = [
  { path: '/admin', element: <Admin /> },
  { path: '/admin/users', element: <Users /> },
  { path: '/admin/donates', element: <Donates /> },
  { path: '/admin/achievements', element: <Achievements /> },
  { path: '/admin/customization', element: <Customization /> },
  { path: '/admin/wikiteka', element: <Wikiteka /> },
  { path: '/admin/orders', element: <Orders /> },
  { path: '/admin/base', element: <Base /> },
  { path: '/admin/tasks', element: <Tasks /> }
]
