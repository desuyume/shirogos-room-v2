import { FC } from 'react'
import { Link } from 'react-router-dom'
import type { DangotekaItemType } from './DangotekaSection'

interface IDangotekaSectionItem {
	type: DangotekaItemType
	itemId: string
	img: string
	title: string
	description: string | null
}

const DangotekaSectionItem: FC<IDangotekaSectionItem> = ({
	type,
	itemId,
	img,
	title,
	description,
}) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='flex items-center'>
				<Link
					className='w-[14.75rem] h-[19.4375rem] inline-block'
					to={type === 'manga' ? '/manga/' + itemId + '/1' : '/story/' + itemId}
				>
					<img
						className='w-full h-full object-cover rounded-[2.3125rem]'
						src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
						alt='manga-img'
					/>
				</Link>
				<p className='text-primaryText text-[0.9375rem] text-center ml-[1.8rem] w-[15.6875rem]'>
					{description}
				</p>
			</div>
			<Link
				to={type === 'manga' ? '/manga/' + itemId + '/1' : '/story/' + itemId}
			>
				<h3 className='text-primaryText text-xl w-[14.75rem] text-center mr-[17.4rem] mt-3'>
					{title}
				</h3>
			</Link>
		</div>
	)
}

export default DangotekaSectionItem
