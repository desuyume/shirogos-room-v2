import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import Tasks from '../Main/Tasks'
import ChangeRoomName from '../Main/ChangeRoomName'
import BuyColor from '../Main/BuyColor'
import UniqueRoles from '../Main/UniqueRoles'

const Main: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room/boutique' ||
		location.pathname === '/room/boutique/'

	return (
		<div
			className={
				(isActive ? 'block ' : 'hidden ') +
				'h-[57.6875rem] flex flex-col justify-between pt-[0.94rem]'
			}
		>
			<div className='w-full flex justify-center ml-[5%]'>
				<Tasks />
				<div className='w-[45.5%] h-[27.875rem] flex flex-col justify-between'>
					<ChangeRoomName />
					<div className='flex justify-between'>
						<BuyColor type='account' />
						<BuyColor type='nickname' />
					</div>
				</div>
			</div>
			<UniqueRoles />
		</div>
	)
}

export default Main
