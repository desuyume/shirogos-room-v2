import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { FC, useContext, useEffect, useState } from 'react'
import FrameItem from './FrameItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { useBuyedRoomFrames } from '@/api/useBuyedRoomFrames'
import { cn } from '@/utils/cn'

const SelectFrame: FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { isLoading, isFetching, isError, isSuccess, data: roomFrames } = useBuyedRoomFrames()

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess) {
      if (roomFrames.selected_frame) {
        setSelectedFrame(roomFrames.selected_frame.id)
      }
    }
  }, [isLoading, isFetching])

  return (
    <div
      className={`h-[15.9375rem] w-full ${
        colorVariants.bgRoomGradient[roomAppearance.active_room_color]
      } select-frame flex rounded-[1.5625rem] py-[0.625rem] pl-[0.5625rem]`}
    >
      <div className='flex h-full min-w-[10.1875rem] max-w-[10.1875rem] items-center justify-center rounded-[1.0625rem] bg-tertiary'>
        <p className='text-[1.0625rem] text-primaryText'>Рамка</p>
      </div>

      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center'>Ошибка 0_0</p>
        </div>
      ) : (
        <Scrollbar noDefaultStyles noScrollY style={{ width: '100%', height: '100%' }}>
          <div
            className={cn('h-full pl-[0.9375rem]', {
              'pb-2.5': roomFrames.buyed_frames.length > 1
            })}
          >
            <div className='mb-[0.0625rem] flex gap-x-[1.1875rem]'>
              {roomFrames.buyed_frames
                .filter((_, index) => index % 2 === 0)
                .map((frame) => (
                  <FrameItem
                    key={frame.Frame.id}
                    frame={frame.Frame}
                    selectedFrame={selectedFrame}
                    setSelectedFrame={setSelectedFrame}
                  />
                ))}
            </div>
            <div className='flex gap-x-[1.1875rem]'>
              {roomFrames.buyed_frames
                .filter((_, index) => index % 2 !== 0)
                .map((frame) => (
                  <FrameItem
                    key={frame.Frame.id}
                    frame={frame.Frame}
                    selectedFrame={selectedFrame}
                    setSelectedFrame={setSelectedFrame}
                  />
                ))}
            </div>
          </div>
        </Scrollbar>
      )}
    </div>
  )
}

export default SelectFrame
