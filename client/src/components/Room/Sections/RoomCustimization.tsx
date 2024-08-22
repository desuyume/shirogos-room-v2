import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import SwitchRoles from '../Customization/SwitchRoles'
import SelectColor from '../Customization/SelectColor'
import SelectFavoriteCharacter from '../Customization/SelectFavoriteCharacter'
import SelectBackground from '../Customization/SelectBackground'
import SelectFrame from '../Customization/SelectFrame'

const RoomCustimization: FC = () => {
  const location = useLocation()
  const isActive = location.pathname.includes('/room/customization')

  return (
    <div
      className={
        (isActive ? 'block' : 'hidden') +
        ' h-[53rem] rounded-[2.3125rem] bg-secondaryHover pb-10 pl-[2.13rem] pr-7 pt-6 transition-all'
      }
    >
      <SelectColor className='mb-[0.56rem]' type='room' title='Цветовая тема аккаунта' />
      <SelectColor className='mb-[1.13rem]' type='username' title='Цвет никнейма' />
      <div className='mb-[1.125rem] flex'>
        <div className='flex min-w-[20%] flex-col justify-between'>
          <SwitchRoles />
          <SelectFavoriteCharacter />
        </div>
        <SelectBackground />
      </div>
      <SelectFrame />
    </div>
  )
}

export default RoomCustimization
