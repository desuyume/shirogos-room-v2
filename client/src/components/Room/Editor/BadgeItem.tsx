import { FC, useContext } from 'react'
import { IEditorBadge } from '../Sections/RoomEditor'
import { RoomAppearanceContext } from '@/Context'
import { colorVariantsGroupHover } from '@/consts/roomColors'

interface IBadgeItem {
	id: number
	title: string
	badgeImg: string
	setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
	zIndexCount: number
	setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const BadgeItem: FC<IBadgeItem> = ({
	id,
	title,
	badgeImg,
	setEditorBadges,
	zIndexCount,
	setZIndexCount,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	const clickHandler = () => {
		setEditorBadges(prev =>
			prev.length > 0
				? [
						...prev,
						{
							badge_id: id,
							badgeImg: badgeImg,
							zIndex: zIndexCount,
						},
				  ]
				: [
						{
							badge_id: id,
							badgeImg: badgeImg,
							zIndex: zIndexCount,
						},
				  ]
		)

		setZIndexCount(prev => prev + 1)
	}

	return (
		<div
			key={id}
			className='min-w-[7rem] max-w-[7rem] h-full flex flex-col items-center mr-[0.5625rem] last-of-type:mr-0 cursor-pointer transition-all group'
			onClick={clickHandler}
		>
			<div className='h-[7rem] mb-2 flex justify-center items-center'>
				<img
					src={`${import.meta.env.VITE_SERVER_URL}/${badgeImg}`}
					alt={title}
				/>
			</div>

			<p
				className={`max-h-[2.7rem] max-w-full text-[0.8125rem] text-primaryText leading-[0.9rem] px-3 text-center overflow-hidden text-ellipsis ${
					colorVariantsGroupHover.text[roomAppearance.active_room_color]
				} transition-all`}
			>
				{title}
			</p>
		</div>
	)
}

export default BadgeItem
