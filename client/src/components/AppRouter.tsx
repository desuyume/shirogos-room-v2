import { FC } from 'react';
import { routes } from '@/router/routes'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRouter: FC = () => {
	return (
		<Routes>
			<Route path='*' element={<Navigate to='/' />} />
			<Route path='/admin/*' element={<Navigate to='/admin' />} />
			{routes.map(route => 
					<Route key={route.path} path={route.path} element={route.element} />
			)}
		</Routes>
	);
};

export default AppRouter;