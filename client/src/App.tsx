import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/components/AppRouter'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context'

function App() {
	const context = useContext(UserContext)

	useEffect(() => {
		console.log(context?.user)
	}, [context])

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
