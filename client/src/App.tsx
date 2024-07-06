import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/components/AppRouter'
import ScrollToTop from './components/ScrollToTop'

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
