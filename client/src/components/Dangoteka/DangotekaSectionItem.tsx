import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import type { DangotekaItemType } from './DangotekaSection'
import { cn } from '@/utils/cn'

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
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return (
		<div
			onMouseLeave={() => setIsHovered(false)}
			className='w-[32.25rem] h-[24.25rem] flex flex-col justify-center items-center relative'
		>
			<div
				className={cn(
					'absolute top-0 left-0 transition-all duration-1000 flex items-center',
					{
						'left-[7.375rem]': isHovered,
					}
				)}
			>
				<Link
					onMouseEnter={() => setIsHovered(true)}
					className={cn(
						'w-[14.75rem] h-[19.4375rem] transition-all duration-1000 inline-block z-10',
						{
							'w-[18.0625rem] h-[23.8125rem]': isHovered,
						}
					)}
					to={type === 'manga' ? '/manga/' + itemId + '/1' : '/story/' + itemId}
				>
					<img
						className='w-full h-full object-cover rounded-[2.3125rem]'
						src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
						alt='manga-img'
					/>
				</Link>
				<div
					className={cn(
						'w-[15.6875rem] h-full absolute top-0 left-[16.5625rem] flex justify-center items-center transition-all duration-1000',
						{
							'left-0': isHovered,
						}
					)}
				>
					<p className='text-primaryText text-[0.9375rem] text-center break-words line-clamp-[13] '>
						{description}
					</p>
				</div>
			</div>
			<div
				className={cn(
					'w-[14.75rem] h-14 absolute bottom-4 left-0 flex justify-center items-center transition-all duration-1000',
					{
						'left-[7.375rem] bottom-6': isHovered,
					}
				)}
			>
				<h3 className='text-primaryText text-xl text-center line-clamp-2 break-words'>
					{title}
				</h3>
			</div>
		</div>
	)
}

export default DangotekaSectionItem
