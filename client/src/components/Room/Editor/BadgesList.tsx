import { BadgeSectionType } from '@/types/badge.interface'
import { IBadge } from '@/types/room.interface'
import { FC, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import BadgeItem from './BadgeItem'
import { IEditorBadge } from '../Sections/RoomEditor'

interface IBadgesList {
	badges: IBadge[]
	activeBadgesSection: BadgeSectionType
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
	setZIndexCount
}) => {
	const [filteredBadges, setFilteredBadges] = useState<IBadge[]>(badges)

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
		badge => badge.awardType.type === `${activeBadgesSection}-badge`
	).length ? (
		<div className='w-full h-full flex justify-center items-center'>
			<p className='text-xl text-center'>Нет значков</p>
		</div>
	) : (
		<Scrollbar noScrollY noDefaultStyles className='w-full flex-1 pb-2'>
			<div className='flex h-full'>
				{filteredBadges
					.filter(
						badge => badge.awardType.type === `${activeBadgesSection}-badge`
					)
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
