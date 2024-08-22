import { FC, useContext, useState } from 'react'
import BadgesNav from './BadgesNav'
import BadgesList from './BadgesList'
import BadgesBuy from './BadgesBuy'
import BadgesTitle from './BadgesTitle'
import { useBoutiqueBadges } from '@/api/useBoutiqueBadges'
import { IBadge } from '@/types/badge.interface'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const Badges: FC = () => {
  const [activeSection, setActiveSection] = useState<string>('unique')
  const [activeBadge, setActiveBadge] = useState<IBadge | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { data: badges, isLoading, isError } = useBoutiqueBadges()

  return (
    <div
      className={`h-full w-[18.3%] min-w-[13.75rem] ${
        colorVariants.bgRoomGradient[roomAppearance.active_room_color]
      } badges flex flex-col items-center rounded-[1.5625rem] pt-[0.69rem]`}
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-[0.8125rem] leading-[97.795%] text-primaryText'>
            Загрузка...
          </p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-[0.8125rem] leading-[97.795%] text-primaryText'>Ошибка</p>
        </div>
      ) : !badges.badges.length ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-[0.8125rem] leading-[97.795%] text-primaryText'>
            Значков нет
          </p>
        </div>
      ) : (
        <>
          <BadgesTitle />
          <BadgesNav activeSection={activeSection} setActiveSection={setActiveSection} />
          <BadgesList
            badges={badges.badges}
            buyedBadges={badges?.buyedBadges}
            activeSection={activeSection}
            activeBadge={activeBadge}
            setActiveBadge={setActiveBadge}
          />
          <BadgesBuy activeBadge={activeBadge} buyedBadges={badges?.buyedBadges} />
        </>
      )}
    </div>
  )
}

export default Badges
