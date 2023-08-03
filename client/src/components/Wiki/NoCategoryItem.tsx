import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface INoCategoryItem {
	name: string
	img: string
}

const NoCategoryItem: FC<INoCategoryItem> = ({ name, img }) => {
	const [isItemHovered, setIsItemHovered] = useState<boolean>(false)

	return (
		<Link
			to='/wiki'
			onMouseOver={() => setIsItemHovered(true)}
			onMouseLeave={() => setIsItemHovered(false)}
			className='justify-self-center w-[11.1875rem] flex flex-col items-center relative cursor-pointer'
		>
			<img
				className={
					(isItemHovered && 'scale-110') +
					' w-full rounded-[1.25rem] border-2 border-[#DEDEDE] transition-all'
				}
				src={img}
				alt='character-img'
			/>
			<p
				className={
					(isItemHovered
						? 'text-primary translate-y-[0.71rem]'
						: 'text-[#FFF]') + ' w-full mt-[0.94rem] break-words text-center text-base transition-all'
				}
			>
				{name}
			</p>
		</Link>
	)
}

export default NoCategoryItem
