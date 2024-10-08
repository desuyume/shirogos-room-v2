import { FC, useContext } from 'react'
import RoomNavBttn from './RoomNavBttn'
import { RoomAppearanceContext } from '@/Context'

const RoomNav: FC = () => {
  const links = [
    { title: 'Комната', path: '/room' },
    { title: 'Кастомизация', path: '/room/customization' },
    { title: 'Бутик', path: '/room/boutique' },
    { title: 'Настройки', path: '/room/settings' },
    { title: 'Редактор', path: '/room/editor' }
  ]
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <nav className='relative z-10 mx-auto flex w-[73.85vw] items-center justify-center [&>a:first-child]:mr-3 [&>a:nth-child(2)]:mr-3 [&>a:nth-child(3)]:mr-[6.3rem] [&>a:nth-child(4)]:mr-[5.8rem]'>
      {links.map((link) => (
        <RoomNavBttn
          key={link.path}
          path={link.path}
          title={link.title}
          bgColor={roomAppearance.active_room_color}
        />
      ))}
      <hr className='absolute -z-10 w-full border-t-[0.5625rem] border-secondary' />
    </nav>
  )
}

export default RoomNav
