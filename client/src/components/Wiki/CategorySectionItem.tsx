import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface ICategorySectionItem {
	name: string
	img: string
}

const CategorySectionItem: FC<ICategorySectionItem> = ({ name, img }) => {
	const [isItemHovered, setIsItemHovered] = useState<boolean>(false)

	return (
		<Link
			to='/wiki/sam-avrorus'
			onMouseOver={() => setIsItemHovered(true)}
			onMouseLeave={() => setIsItemHovered(false)}
			className='justify-self-center w-[8.5625rem] flex flex-col items-center cursor-pointer'
		>
			<img
				className='w-full rounded-[1.25rem] border-2 border-[#DEDEDE] transition-all'
				src={img}
				alt='character-img'
			/>
			<p className={(isItemHovered ? 'text-primary' : 'text-[#FFF]') + ' w-full mt-[0.94rem] break-words text-center text-base transition-all'}>
				{name}
			</p>
		</Link>
	)
}

export default CategorySectionItem
