import { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <p className='text-xl text-primary'>Загрузка...</p>
    </div>
  )
}

export default Loader
