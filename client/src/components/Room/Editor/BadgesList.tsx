import type { BadgeType } from '@/types/badge.interface'
import { IBadge } from '@/types/badge.interface'
import { FC, useContext, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import BadgeItem from './BadgeItem'
import { IEditorBadge } from '../Sections/RoomEditor'
import { RoomAppearanceContext } from '@/Context'

interface IBadgesList {
	badges: IBadge[]
	activeBadgesSection: BadgeType
	editorBadges: IEditorBadge[]
	setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
	zIndexCount: number
	setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const BadgesList: FC<IBadgesList> = ({
	badges,
	activeBadgesSection,
	editorBadges,
	setEditorBadges,
	zIndexCount,
	setZIndexCount,
}) => {
	const [filteredBadges, setFilteredBadges] = useState<IBadge[]>(badges)
	const roomAppearance = useContext(RoomAppearanceContext)

	const filterBadges = () => {
		setFilteredBadges(
			badges.filter(b => {
				const editorBadge = editorBadges.find(e => e.badge_id === b.id)

				return !editorBadge
			})
		)
	}

	useEffect(() => {
		filterBadges()
	}, [editorBadges])

	return !filteredBadges.filter(
		badge => badge.type.type === activeBadgesSection
	).length ? (
		<div className='w-full h-full flex justify-center items-center'>
			<p className='text-xl text-center'>Нет значков</p>
		</div>
	) : (
		<Scrollbar
			noScrollY
			noDefaultStyles
			className={`w-full flex-1 pb-2 ${roomAppearance.active_room_color}-scrollbar`}
		>
			<div className='flex h-full'>
				{filteredBadges
					.filter(badge => badge.type.type === activeBadgesSection)
					.map(badge => (
						<BadgeItem
							key={badge.id}
							{...badge}
							setEditorBadges={setEditorBadges}
							zIndexCount={zIndexCount}
							setZIndexCount={setZIndexCount}
						/>
					))}
			</div>
		</Scrollbar>
	)
}

export default BadgesList
