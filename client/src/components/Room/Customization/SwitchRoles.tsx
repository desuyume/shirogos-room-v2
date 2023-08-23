import { FC } from 'react'
import RoleSwitcher from './RoleSwitcher'

const SwitchRoles: FC = () => {
	return (
		<div className='h-[6.1875rem] w-full bg-secondary rounded-t-[1.0625rem] mb-[1.12rem]'>
			<div className='bg-tertiary h-[2.8125rem] rounded-[1.0625rem] flex justify-center items-center'>
				<p className='text-primaryText text-xl text-center'>Уникальная роль</p>
			</div>
			<RoleSwitcher type='adjective' />
			<RoleSwitcher type='noun' />
		</div>
	)
}

export default SwitchRoles
