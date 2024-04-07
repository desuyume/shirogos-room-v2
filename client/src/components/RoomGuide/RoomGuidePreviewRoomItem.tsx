import { IRoomGuideRandom } from '@/types/room-guide.interface'
import { FC } from 'react'
import noProfilePic from '@/assets/no-profile-picture-icon.webp'
import { Link } from 'react-router-dom'

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
				'w-[22%] flex flex-col items-center mr-[4%] last-of-type:mr-0 room-guide-preview-item ' +
				(!!order ? `anim-order-${order}` : '')
			}
		>
			<Link
				className='w-full order-3 peer'
				to={`/guide/${room.user.username}?from=guidePreview`}
			>
				<img
					className='w-full rounded-[2.3125rem] aspect-[185/134] object-cover cursor-pointer outline outline-transparent outline-[3px] hover:outline-primary transition-all'
					src={
						!!room.user.miniature_img
							? `${import.meta.env.VITE_SERVER_URL}/${room.user.miniature_img}`
							: !!room.user.profile_img
							? `${import.meta.env.VITE_SERVER_URL}/${room.user.profile_img}`
							: noProfilePic
					}
					alt={`${room.user.username}-pic`}
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
