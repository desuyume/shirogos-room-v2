import { FC } from 'react';
import { routes } from '@/router/routes'
import { Navigate, Route, Routes } from 'react-router-dom'

const AppRouter: FC = () => {
	return (
		<Routes>
			{routes.map(route => 
					<Route key={route.path} path={route.path} element={route.element} />
			)}
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default AppRouter;