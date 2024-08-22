import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'
import logoHover from '@/assets/logo-hover.png'

const CreateRoomHeader: FC = () => {
  const [isLogoHover, setIsLogoHover] = useState<boolean>(false)

  return (
    <div className='flex h-[5.25rem] items-center justify-center bg-tertiary'>
      <Link
        className='absolute left-4'
        to='/'
        onMouseOver={() => setIsLogoHover(true)}
        onMouseLeave={() => setIsLogoHover(false)}
      >
        <img src={isLogoHover ? logoHover : logo} alt='logo' />
      </Link>
      <p className='absolute right-5 font-secondary text-[2.5rem] font-bold tracking-[0.05rem] text-primary'>
        СОЗДАЕМ КОМНАТУ
      </p>
    </div>
  )
}

export default CreateRoomHeader
