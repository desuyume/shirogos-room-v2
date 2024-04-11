import Achievements from '@/pages/Admin/Achievements'
import Base from '@/pages/Admin/Base'
import Donates from '@/pages/Admin/Donates'
import Orders from '@/pages/Admin/Orders'
import Tasks from '@/pages/Admin/Tasks'
import Users from '@/pages/Admin/Users'
import Wikiteka from '@/pages/Admin/Wikiteka'
import { IRoute } from '@/types/types'
import Customization from '@/pages/Admin/Customization'

export const adminRoutes: IRoute[] = [
	{ path: '/users', element: <Users /> }, 
	{ path: '/donates', element: <Donates /> }, 
	{ path: '/achievements', element: <Achievements /> }, 
	{ path: '/customization', element: <Customization /> }, 
	{ path: '/wikiteka', element: <Wikiteka /> }, 
	{ path: '/orders', element: <Orders /> }, 
	{ path: '/base', element: <Base /> }, 
	{ path: '/tasks', element: <Tasks /> }, 
]