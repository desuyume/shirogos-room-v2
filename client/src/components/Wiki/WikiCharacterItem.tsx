import { cn } from '@/utils/cn'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface WikiCharacterItemProps {
	id: string
	name: string
	img: string | null
	inCategory?: boolean
}

const WikiCharacterItem: FC<WikiCharacterItemProps> = ({
	id,
	name,
	img,
	inCategory = false,
}) => {
	const [isItemHovered, setIsItemHovered] = useState<boolean>(false)

	return (
		<Link
			to={`/wiki/${id}`}
			onMouseOver={() => setIsItemHovered(true)}
			onMouseLeave={() => setIsItemHovered(false)}
			className={cn(
				'justify-self-center flex flex-col items-center relative cursor-pointer',
				{
					'w-[11.1875rem]': !inCategory,
					'w-[8.5625rem]': inCategory,
				}
			)}
		>
			{!!img ? (
				<img
					className={cn(
						'w-full rounded-[1.25rem] object-cover border-2 border-primaryText transition-all aspect-[179/240]',
						{
							'scale-110': isItemHovered && !inCategory,
						}
					)}
					src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
					alt='character-img'
				/>
			) : (
				<div
					className={cn(
						'w-full rounded-[1.25rem] border-2 border-primaryText transition-all aspect-[179/240] bg-tertiary',
						{
							'scale-110': isItemHovered && !inCategory,
						}
					)}
				/>
			)}

			<div className='w-full h-[3.125rem] flex justify-center items-center'>
				<p
					className={cn(
						'w-full break-words text-center text-base leading-5 line-clamp-2 transition-all',
						{
							'text-primary translate-y-[0.715625rem]':
								isItemHovered && !inCategory,
							'text-primary ': isItemHovered && inCategory,
							'text-primaryText': !isItemHovered,
						}
					)}
				>
					{name}
				</p>
			</div>
		</Link>
	)
}

export default WikiCharacterItem
