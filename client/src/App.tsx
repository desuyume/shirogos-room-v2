import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/components/AppRouter'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context'
import axios from 'axios'
import { IUserTokens } from './types/user.interface'

function App() {
	const context = useContext(UserContext)

	const checkAuth = async () => {
		try {
			const response = await axios.get<IUserTokens>(`${import.meta.env.VITE_API_URL}/user/refresh`, { withCredentials: true })
			console.log(response);
			localStorage.setItem('token', response.data.accessToken);
			context?.setUser(response.data.user)
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth();
		}
	}, [])

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
