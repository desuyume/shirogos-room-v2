import { IRoomGuideRandom } from '@/types/room-guide.interface'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import ProfileMiniature from '../ProfileMiniature'

interface IRoomGuidePreviewRoomItem {
	room: IRoomGuideRandom
	order?: number
}

const RoomGuidePreviewRoomItem: FC<IRoomGuidePreviewRoomItem> = ({
	room,
	order,
}) => {
	return (
		<div
			className={
				'w-[11.5625rem] flex flex-col items-center mr-[1.3125rem] last-of-type:mr-0 room-guide-preview-item ' +
				(!!order ? `anim-order-${order}` : '')
			}
		>
			<Link
				className='w-full order-3 peer'
				to={`/guide/${room.user.username}?from=guidePreview`}
			>
				<ProfileMiniature
					miniature_img={room.user.miniature_img}
					profile_img={room.user.profile_img}
					username={room.user.username}
					frame={room.selected_frame}
					className='w-full rounded-[2.3125rem] aspect-[185/134] object-cover cursor-pointer outline outline-transparent outline-[3px] hover:outline-primary transition-all'
				/>
			</Link>

			<p className='text-[#EBE984] font-secondary font-bold text-[0.625rem] order-1 peer-hover:text-primary transition-all px-2 max-w-full truncate'>
				{room.user.username}
			</p>
			<p className='text-primaryText text-xs mb-1 leading-4 font-secondary font-bold text-center order-2 max-h-12 break-words max-w-full overflow-hidden'>
				Комната «{room.name}»
			</p>
		</div>
	)
}

export default RoomGuidePreviewRoomItem
