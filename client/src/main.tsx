import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/tailwind.base.css'
import '@/styles/custom-scroll.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
)
