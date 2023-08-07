import RoomContent from '@/components/Admin/Room/RoomContent'
import UniqueRoles from '@/components/Admin/Room/UniqueRoles'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Room: FC = () => {
	return (
		<AdminWrapper>
			<div className='flex justify-center mt-7 room'>
				<RoomContent title='Паноптикум' type='panopticon' />
				<RoomContent title='Фоны' type='backgrounds' />
				<UniqueRoles />
			</div>
		</AdminWrapper>
	)
}

export default Room
