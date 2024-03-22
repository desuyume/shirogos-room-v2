import { useBuyedBadges } from '@/api/useBuyedBadges'
import { FC, useState } from 'react'
import BadgesNav from './BadgesNav'
import { BadgeSectionType } from '@/types/badge.interface'
import BadgesList from './BadgesList'
import { IEditorBadge } from '../Sections/RoomEditor'

interface IBadgesSection {
	editorBadges: IEditorBadge[]
	setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
	zIndexCount: number
	setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const BadgesSection: FC<IBadgesSection> = ({
	editorBadges,
	setEditorBadges,
	zIndexCount,
	setZIndexCount
}) => {
	const [activeBadgesSection, setActiveBadgesSection] =
		useState<BadgeSectionType>('unique')

	const { data: badges, isLoading, isError } = useBuyedBadges()

	return (
		<div className='w-full h-[13.125rem] rounded-[2.3125rem] bg-secondaryHover'>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Ошибка</p>
				</div>
			) : !badges.length ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Нет купленных значков</p>
				</div>
			) : (
				<div className='w-full h-full flex flex-col items-center pt-[1.1875rem] pl-[1.0625rem] pr-5 editor-badges'>
					<BadgesNav
						activeBadgesSection={activeBadgesSection}
						setActiveBadgesSection={setActiveBadgesSection}
					/>
					<BadgesList
						activeBadgesSection={activeBadgesSection}
						badges={badges}
						editorBadges={editorBadges}
						setEditorBadges={setEditorBadges}
						zIndexCount={zIndexCount}
						setZIndexCount={setZIndexCount}
					/>
				</div>
			)}
		</div>
	)
}

export default BadgesSection
