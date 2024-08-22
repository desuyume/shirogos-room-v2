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
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'room-guide-screen absolute inset-0 z-30 h-full w-full bg-tertiary transition-all'
      }
    >
      <div className='relative h-full w-full bg-room-guide-screen-gradient'>
        <button
          onClick={() => setIsVisible(false)}
          className='absolute left-[2.5625rem] top-[1.9375rem] z-30 flex h-[5.625rem] w-[5.375rem] items-center justify-center rounded-[2.3125rem] bg-primary pb-3 pr-1 text-[5rem] leading-none text-[#FFF] transition-all hover:bg-primaryHover'
        >{`
			<`}</button>
        <RoomGuideScreenRoomList />
      </div>
    </div>
  )
}

export default RoomGuideScreen
