import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/components/AppRouter'
import '@/styles/custom-scroll.scss'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
