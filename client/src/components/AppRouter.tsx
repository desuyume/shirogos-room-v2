import { FC, useContext } from 'react'
import { adminRouter, privateRouter, publicRouter } from '@/router/routes'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from '@/Context'
import Loader from '@/pages/Loader'

const AppRouter: FC = () => {
	const userContext = useContext(UserContext)

	return !userContext?.isFetched ? (
		<Loader />
	) : (
		<Routes>
			{publicRouter.map(route => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}

			{!!userContext.user &&
				privateRouter.map(route => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}

			{userContext?.user?.role === 'admin' && (
				<>
					<Route path='/admin/*' element={<Navigate to='/admin' />} />
					{adminRouter.map(route => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				</>
			)}

			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}

export default AppRouter
