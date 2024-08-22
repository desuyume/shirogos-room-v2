import { FC, useContext } from 'react'
import { IBackground } from '@/types/background.interface'
import { Scrollbar } from 'react-scrollbars-custom'
import BackgroundItem from './BackgroundItem'
import { RoomAppearanceContext } from '@/Context'

interface IBackgroundsList {
  backgrounds: IBackground[]
  buyedBackgrounds: IBackground[]
  activeBg: IBackground | null
  setActiveBg: React.Dispatch<React.SetStateAction<IBackground | null>>
}

const BackgroundsList: FC<IBackgroundsList> = ({
  backgrounds,
  buyedBackgrounds,
  activeBg,
  setActiveBg
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return !backgrounds.length ? (
    <div className='flex h-full w-full items-center justify-center'>
      <p className='text-center text-xl leading-[97.795%] text-primaryText'>Фонов нет</p>
    </div>
  ) : (
    <Scrollbar
      noDefaultStyles
      className={`w-full flex-1 ${roomAppearance.active_room_color}-scrollbar`}
    >
      <div className='flex w-full flex-1 flex-col items-center'>
        {backgrounds.map((bg) => (
          <BackgroundItem
            key={bg.id}
            background={bg}
            buyedBackgrounds={buyedBackgrounds}
            activeBg={activeBg}
            setActiveBg={setActiveBg}
          />
        ))}
      </div>
    </Scrollbar>
  )
}

export default BackgroundsList
