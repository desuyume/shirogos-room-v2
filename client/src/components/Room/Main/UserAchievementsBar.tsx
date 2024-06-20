import { FC, useContext } from 'react'
import { formatDate } from '@/utils/formatDate'
import { useAchievementsByUsername } from '@/api/useAchievementsByUsername'
import { Scrollbar } from 'react-scrollbars-custom'
import { IRoomAppearance } from '@/types/room.interface'
import { RoomAppearanceContext } from '@/Context'

interface IUserAchievementsBar {
	created_at: Date
	username: string
	isGuide?: boolean
	guideRoomAppearance?: IRoomAppearance
}

const UserAchievementsBar: FC<IUserAchievementsBar> = ({
	created_at,
	username,
	isGuide,
	guideRoomAppearance,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	const { data: achievements } = useAchievementsByUsername(username)

	return (
		<div className='bg-tertiary min-h-[40.625rem] flex-1 flex flex-col justify-end rounded-b-[1.5625rem]'>
			<div className='w-full h-[1.875rem] flex justify-center items-center'>
				<p className='text-primaryText text-xl leading-[97.795%] text-center'>
					Достижения
				</p>
			</div>
			<div className='bg-secondaryHover w-full h-[38.75rem] flex flex-col justify-end items-center rounded-[1.5625rem] relative'>
				<Scrollbar
					noDefaultStyles
					style={{ width: '100%', height: '100%' }}
					className={
						(isGuide
							? `${guideRoomAppearance?.active_room_color}-scrollbar`
							: `${roomAppearance.active_room_color}-scrollbar`) +
						' my-[0.3125rem]'
					}
				>
					<div className='flex flex-col items-center'>
						{achievements?.map(achievement => (
							<div
								key={achievement.id}
								className='w-[91%] aspect-[213/30] rounded-[1.5625rem] relative bg-black flex justify-center items-center z-0 mb-[0.3125rem] last-of-type:mb-0'
							>
								<img
									src={`${import.meta.env.VITE_SERVER_URL}/${
										achievement.background
									}`}
									className='absolute w-full h-full rounded-[1.5625rem] opacity-50 select-none pointer-events-none'
								/>
								<p className='max-w-full max-h-full text-primaryText text-[0.9375rem] text-center break-words overflow-hidden px-4 line-clamp-1 z-10'>
									{achievement.title}
								</p>
							</div>
						))}
					</div>
				</Scrollbar>
				<p className='absolute text-center text-primaryText text-[0.625rem] leading-[97.795%] translate-y-[100%] -bottom-2'>
					{' '}
					участник с {formatDate(created_at)}
				</p>
			</div>
		</div>
	)
}

export default UserAchievementsBar
