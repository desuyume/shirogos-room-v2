import { FC, useContext, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { useBuyedRoomBackgrounds } from '@/api/useBuyedRoomBackgrounds'
import BackgroundItem from './BackgroundItem'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const SelectBackground: FC = () => {
  const [selectedBg, setSelectedBg] = useState<number | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    data: roomBackgrounds
  } = useBuyedRoomBackgrounds()

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess) {
      if (roomBackgrounds.selected_background) {
        setSelectedBg(roomBackgrounds.selected_background.id)
      }
    }
  }, [isLoading, isFetching])

  return (
    <div
      className={`h-[17.5rem] ${
        colorVariants.bgRoomGradient[roomAppearance.active_room_color]
      } select-bg ml-[2%] flex w-[78%] items-center rounded-[1.5625rem] py-[0.63rem] pl-[0.56rem]`}
    >
      <p className='mr-8 flex h-full min-w-[14.85%] max-w-[14.85%] items-center justify-center rounded-[1.0625rem] bg-tertiary text-[1.0625rem] text-primaryText transition-all'>
        Фон
      </p>
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center'>Ошибка 0_0</p>
        </div>
      ) : (
        <Scrollbar noDefaultStyles noScrollY className='flex-1' style={{ height: '100%' }}>
          <div className='flex h-full items-center pl-2'>
            {roomBackgrounds?.selected_background && (
              <BackgroundItem
                id={roomBackgrounds.selected_background.id}
                img={roomBackgrounds.selected_background.img}
                title={roomBackgrounds.selected_background.title}
                selectedBg={selectedBg}
                setSelectedBg={setSelectedBg}
              />
            )}
            {roomBackgrounds.buyed_backgrounds &&
              roomBackgrounds?.buyed_backgrounds
                .filter((bg) => bg.Background.id !== roomBackgrounds.selected_background?.id)
                .map((bg) => (
                  <BackgroundItem
                    key={bg.Background.id}
                    id={bg.Background.id}
                    img={bg.Background.img}
                    title={bg.Background.title}
                    selectedBg={selectedBg}
                    setSelectedBg={setSelectedBg}
                  />
                ))}
          </div>
        </Scrollbar>
      )}
    </div>
  )
}

export default SelectBackground
