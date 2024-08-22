import { FC, useContext, useState } from 'react'
import BackgroundsList from './BackgroundsList'
import BackgroundsBuy from './BackgroundsBuy'
import { IBackground } from '@/types/background.interface'
import { useBoutiqueBackgrounds } from '@/api/useBoutiqueBackgrounds'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const Backgrounds: FC = () => {
  const [activeBackground, setActiveBackground] = useState<IBackground | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { data: backgrounds, isLoading, isError } = useBoutiqueBackgrounds()

  return (
    <div
      className={`h-full max-w-[65%] ${
        colorVariants.bgRoomGradient[roomAppearance.active_room_color]
      } backgrounds mx-auto flex flex-1 flex-col items-center rounded-[1.5625rem] pt-[0.69rem]`}
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-xl leading-[97.795%] text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-xl leading-[97.795%] text-primaryText'>Ошибка</p>
        </div>
      ) : (
        <>
          <div className='mb-[0.62rem] flex h-[3.6875rem] w-[18.3%] min-w-[6.25rem] items-center justify-center rounded-[1.5625rem] bg-tertiary'>
            <p className='text-xl text-primaryText'>Фоны</p>
          </div>
          <BackgroundsList
            backgrounds={backgrounds.backgrounds}
            buyedBackgrounds={backgrounds.buyedBackgrounds}
            activeBg={activeBackground}
            setActiveBg={setActiveBackground}
          />
          <BackgroundsBuy
            activeBackground={activeBackground}
            buyedBackgrounds={backgrounds.buyedBackgrounds}
          />
        </>
      )}
    </div>
  )
}

export default Backgrounds
