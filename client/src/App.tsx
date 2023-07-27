import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import "./styles/scroll.css"

function App() {
	return (
		<SimpleBar className='scroll'>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</SimpleBar>
	)
}

export default App
