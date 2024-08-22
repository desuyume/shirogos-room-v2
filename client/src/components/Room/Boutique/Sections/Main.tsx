import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import Tasks from '../Main/Tasks/Tasks'
import ChangeRoomName from '../Main/ChangeRoomName'
import BuyColor from '../Main/BuyColor'
import UniqueRoles from '../Main/UniqueRoles'

const Main: FC = () => {
  const location = useLocation()
  const isActive = location.pathname === '/room/boutique' || location.pathname === '/room/boutique/'

  return (
    <div
      className={
        (isActive ? 'block ' : 'hidden ') +
        'flex h-[57.6875rem] flex-col justify-between pt-[0.94rem]'
      }
    >
      <div className='ml-[5%] flex w-full justify-center'>
        <Tasks />
        <div className='flex h-[27.875rem] w-[45.5%] flex-col justify-between'>
          <ChangeRoomName />
          <div className='flex justify-between'>
            <BuyColor type='room' />
            <BuyColor type='username' />
          </div>
        </div>
      </div>
      <UniqueRoles />
    </div>
  )
}

export default Main
