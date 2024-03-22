import { FC } from 'react'
import { formatDate } from '@/utils/formatDate'

interface IUserAchievementsBar {
	created_at: Date
}

const UserAchievementsBar: FC<IUserAchievementsBar> = ({ created_at }) => {
	return (
		<div className='bg-tertiary min-h-[40.625rem] flex-1 flex flex-col justify-end rounded-b-[1.5625rem]'>
			<div className='w-full h-[1.875rem] flex justify-center items-center'>
				<p className='text-primaryText text-xl leading-[97.795%] text-center'>
					Достижения
				</p>
			</div>
			<div className='bg-secondaryHover w-full flex-1 flex flex-col justify-end items-center rounded-[1.5625rem]'>
				<div className='w-full flex-1 mb-4'></div>
				<div className='w-full flex flex-col justify-center items-center relative'>
					<p className='absolute text-center text-primaryText text-[0.625rem] leading-[97.795%] translate-y-[100%] -bottom-2'>
						{' '}
						участник с {formatDate(created_at)}
					</p>
				</div>
			</div>
		</div>
	)
}

export default UserAchievementsBar
