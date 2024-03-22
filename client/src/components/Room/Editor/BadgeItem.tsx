import { FC } from 'react'
import { IEditorBadge } from '../Sections/RoomEditor'

interface IBadgeItem {
	id: number
	title: string
	award_img: string
	setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
	zIndexCount: number
	setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const BadgeItem: FC<IBadgeItem> = ({
	id,
	title,
	award_img,
	setEditorBadges,
	zIndexCount,
	setZIndexCount,
}) => {
	const clickHandler = () => {
		setEditorBadges(prev =>
			prev.length > 0
				? [
						...prev,
						{
							badge_id: id,
							award_img: award_img,
							zIndex: zIndexCount,
						},
				  ]
				: [
						{
							badge_id: id,
							award_img: award_img,
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
					src={`${import.meta.env.VITE_SERVER_URL}/${award_img}`}
					alt={title}
				/>
			</div>

			<p className='max-h-[2.7rem] max-w-full text-[0.8125rem] text-primaryText leading-[0.9rem] px-3 text-center overflow-hidden text-ellipsis group-hover:text-primary transition-all'>
				{title}
			</p>
		</div>
	)
}

export default BadgeItem
