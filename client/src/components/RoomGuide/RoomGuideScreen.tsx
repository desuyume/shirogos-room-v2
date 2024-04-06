import { FC } from 'react'
import RoomGuideScreenRoomList from './RoomGuideScreenRoomList'

interface IRoomGuideScreen {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RoomGuideScreen: FC<IRoomGuideScreen> = ({ isVisible, setIsVisible }) => {
	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-full h-full bg-tertiary absolute inset-0 transition-all z-30 room-guide-screen'
			}
		>
			<div className='w-full h-full bg-room-guide-screen-gradient relative'>
				<button
					onClick={() => setIsVisible(false)}
					className='w-[5.375rem] h-[5.625rem] rounded-[2.3125rem] text-[#FFF] text-[5rem] leading-none pb-3 pr-1 flex justify-center items-center bg-primary hover:bg-primaryHover absolute top-[1.9375rem] left-[2.5625rem] transition-all z-30'
				>{`
			<`}</button>
				<RoomGuideScreenRoomList />
			</div>
		</div>
	)
}

export default RoomGuideScreen
