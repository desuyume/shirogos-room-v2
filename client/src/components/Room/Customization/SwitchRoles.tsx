import { FC } from 'react'
import RoleSwitcher from './RoleSwitcher'

const SwitchRoles: FC = () => {
  return (
    <div className='h-[6.1875rem] w-full rounded-t-[1.0625rem] bg-secondary'>
      <div className='flex h-[2.8125rem] items-center justify-center rounded-[1.0625rem] bg-tertiary'>
        <p className='px-2 text-center text-xl leading-none text-primaryText'>Уникальная роль</p>
      </div>
      <RoleSwitcher type='adjective' />
      <RoleSwitcher type='noun' />
    </div>
  )
}

export default SwitchRoles
