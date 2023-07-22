import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IDangotekaSectionItem { 
	img: string,
	title: string,
	description: string
}

const DangotekaSectionItem: FC<IDangotekaSectionItem> = ({ img, title, description }) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='flex items-center'>
				<Link className='min-w-[14.75rem] min-h-[19.4375rem] max-w-[14.75rem] max-h-[19.4375rem] inline-block' to='/'><img className='rounded-[2.3125rem]' src={img} alt='manga-img' /></Link>
				<p className='text-primaryText text-[0.9375rem] text-center ml-[1.8rem] w-[15.6875rem]'>{description}</p>
			</div>
			<Link to='/'><h3 className='text-primaryText text-xl w-[14.75rem] text-center mr-[17.4rem] mt-3'>{title}</h3></Link>
		</div>
	)
}

export default DangotekaSectionItem