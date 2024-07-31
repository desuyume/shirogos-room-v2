import { IRoomGuideByLevel } from '@/types/room-guide.interface'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ProfileMiniature from '../ProfileMiniature'

interface IRoomGuideScreenRoomItem {
	index: number
	room: IRoomGuideByLevel
}

const RoomGuideScreenRoomItem: FC<IRoomGuideScreenRoomItem> = ({
	index,
	room,
}) => {
	return (
		<div className='w-full h-[14.75rem] flex justify-between items-center mb-[1.9375rem] last-of-type:mb-0 '>
			<p className='max-w-[8.2%] min-w-[8.2%] text-[3.125rem] break-words text-primaryText leading-[97.8%] text-right z-40'>
				#{index}
			</p>
			<Link
				className='w-[90.5%] min-w-[90.5%] h-full'
				to={`/guide/${room.user.username}?from=guideScreen`}
			>
				<div className='max-w-full min-w-full h-full relative cursor-pointer flex justify-between items-center group'>
					<ProfileMiniature
						miniature_img={room.user.miniature_img}
						profile_img={room.user.profile_img}
						username={room.user.username}
						frame={room.selected_frame}
						containerClassName='h-full'
						className='h-full aspect-[290/236] object-cover rounded-[2.3125rem] z-10'
					/>
					<div className='flex-1 overflow-hidden h-full px-[2.6%] flex justify-between items-center z-10'>
						<div className='min-w-[61.75%] max-w-[61.75%]'>
							<p className='font-secondary font-bold text-primaryText text-2xl laptop:leading-[60px] laptop:text-[2.8125rem] max-w-full overflow-hidden break-words'>
								Комната «{room.name}»
							</p>
						</div>

						<div className='flex flex-col items-center min-w-[30%] max-w-[30%]'>
							<p className='font-secondary font-bold text-xl laptop:leading-[45px] laptop:text-[2.1875rem] max-h-[90px] overflow-hidden text-[#EBE984] text-center max-w-full break-words'>
								{room.user.username}
							</p>
							<p className='font-secondary font-bold text-xl laptop:leading-none laptop:text-[2.1875rem] text-primaryText text-center max-w-full'>
								{room.user.level} уровень
							</p>
						</div>
					</div>
					<div
						style={{
							backgroundImage: !!room.selected_background
								? `url(${import.meta.env.VITE_SERVER_URL}/${room
										.selected_background?.img})`
								: "url('/images/room-default-bg.webp')",
						}}
						className='h-full w-full absolute right-0 rounded-[2.3125rem] bg-cover bg-center bg-no-repeat opacity-20 group-hover:opacity-50 transition-all'
					/>
				</div>
			</Link>
		</div>
	)
}

export default RoomGuideScreenRoomItem
