import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoom } from '@/api/useRoom'
import UserInfoBar from '../Main/UserInfoBar'
import UserAchievementsBar from '../Main/UserAchievementsBar'

const RoomMain: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room' || location.pathname === '/room/'
	const { isLoading, isError, data: roomInfo } = useRoom()

	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' transition-all flex justify-between w-full h-full'
			}
		>
			{isLoading ? (
				<p className='text-xl text-center w-full'>Загрузка...</p>
			) : isError ? (
				<p className='text-xl text-center w-full'>Не удалось получить данные</p>
			) : (
				<>
					<div className='flex-1 mr-[1.38rem]'>
						<div className='bg-tertiary w-full flex flex-col justify-center items-center h-[4.875rem] rounded-[2.3125rem] mb-[1.13rem]'>
							<p className='text-primaryText text-xl leading-[97.795%]'>
								Комната
							</p>
							<p className='text-primaryText text-[1.875rem] leading-[97.795%]'>
								{roomInfo.name}
							</p>
						</div>
						<div className='bg-secondaryHover bg-opacity-75 rounded-[2.3125rem] w-full h-[59.5625rem]'></div>
					</div>
					<div className='w-[14.625rem] flex flex-col justify-between'>
						<UserInfoBar
							profile_img={roomInfo.user.profile_img}
							username={roomInfo.user.username}
							past_usernames={roomInfo.user.past_usernames}
							level={roomInfo.user.level}
						/>
						<UserAchievementsBar created_at={roomInfo.created_at} />
					</div>
				</>
			)}
		</div>
	)
}

export default RoomMain
