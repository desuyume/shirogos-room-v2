import { BrowserRouter } from 'react-router-dom'
import AppRouter from '@/components/AppRouter'
import ScrollToTop from './components/ScrollToTop'
import { Bounce, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
        toastClassName={'w-[22rem]'}
      />
    </BrowserRouter>
  )
}

export default App
