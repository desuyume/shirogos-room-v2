import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/tailwind.base.css'
import '@/styles/custom-scroll.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Context from './Context.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<Context>
			<App />
		</Context>
	</QueryClientProvider>
)
