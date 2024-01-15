import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface INoCategoryItem {
	id: string
	name: string
	img: string | null
}

const NoCategoryItem: FC<INoCategoryItem> = ({ id, name, img }) => {
	const [isItemHovered, setIsItemHovered] = useState<boolean>(false)

	return (
		<Link
			to={`/wiki/${id}`}
			onMouseOver={() => setIsItemHovered(true)}
			onMouseLeave={() => setIsItemHovered(false)}
			className='justify-self-center w-[11.1875rem] flex flex-col items-center relative cursor-pointer'
		>
			{!!img ? (
				<img
					className={
						(isItemHovered && 'scale-110') +
						' w-full rounded-[1.25rem] border-2 border-[#DEDEDE] transition-all aspect-[179/239]'
					}
					src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
					alt='character-img'
				/>
			) : (
				<div
					className={
						(isItemHovered && 'scale-110') +
						' w-full rounded-[1.25rem] border-2 border-[#DEDEDE] transition-all aspect-[179/239] bg-tertiary'
					}
				/>
			)}

			<p
				className={
					(isItemHovered
						? 'text-primary translate-y-[0.71rem]'
						: 'text-[#FFF]') +
					' w-full mt-[0.94rem] break-words text-center text-base transition-all'
				}
			>
				{name}
			</p>
		</Link>
	)
}

export default NoCategoryItem
