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
			className={`w-[18.3%] min-w-[13.75rem] h-full ${
				colorVariants.bgRoomGradient[roomAppearance.active_room_color]
			} rounded-[1.5625rem] flex flex-col items-center pt-[0.69rem] badges`}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
						Загрузка...
					</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
						Ошибка
					</p>
				</div>
			) : !badges.badges.length ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-[0.8125rem] leading-[97.795%] text-center'>
						Значков нет
					</p>
				</div>
			) : (
				<>
					<BadgesTitle />
					<BadgesNav
						activeSection={activeSection}
						setActiveSection={setActiveSection}
					/>
					<BadgesList
						badges={badges.badges}
						buyedBadges={badges?.buyedBadges}
						activeSection={activeSection}
						activeBadge={activeBadge}
						setActiveBadge={setActiveBadge}
					/>
					<BadgesBuy
						activeBadge={activeBadge}
						buyedBadges={badges?.buyedBadges}
					/>
				</>
			)}
		</div>
	)
}

export default Badges
