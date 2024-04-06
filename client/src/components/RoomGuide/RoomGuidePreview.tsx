import { FC } from 'react'
import RoomGuidePreviewRoomList from './RoomGuidePreviewRoomList'

interface IRoomGuidePreview {
	setIsRoomGuideScreenVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RoomGuidePreview: FC<IRoomGuidePreview> = ({
	setIsRoomGuideScreenVisible,
}) => {
	return (
		<div className='w-full h-[26.0625rem] rounded-[2.3125rem] mb-[1.31rem] flex'>
			<RoomGuidePreviewRoomList />
			<button
				onClick={() => setIsRoomGuideScreenVisible(true)}
				className='w-[15.625%] h-full bg-black-to-secondary-gradient transition-all rounded-tr-[2.3125rem] rounded-br-[2.3125rem] flex justify-center items-center group relative'
			>
				<p className='font-secondary font-bold text-primaryText group-hover:text-[#FFF] text-[1.5625rem] leading-none text-center transition-all mr-14 rotate-90'>
					ПОЛНЫЙ ПУТЕВОДИТЕЛЬ
				</p>
				<div className='w-0 h-0 border-l-[2rem] border-l-primary group-hover:border-l-primaryHover border-t-[7rem] border-t-transparent border-b-[7rem] border-b-transparent absolute right-[2.1875rem] transition-all' />
			</button>
		</div>
	)
}

export default RoomGuidePreview
