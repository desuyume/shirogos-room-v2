import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/components/AppRouter'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context'
import userService from './services/user.service'
import ScrollToTop from './components/ScrollToTop'

function App() {
	const context = useContext(UserContext)

	const checkAuth = async () => {
		try {
			const userData = await userService.refresh()
			if (userData) {
				context?.setUser(userData.data.user)
			}
		} catch (e) {
			localStorage.removeItem('token')
			context?.setUser(null)
			console.log(e)
		}
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
		}
	}, [])

	return (
		<BrowserRouter>
			<ScrollToTop />
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
