import { FC } from 'react'
import DangotekaSectionList from './DangotekaSectionList'

interface IDangotekaSection { 
	title: string,
	type: string
}

const DangotekaSection: FC<IDangotekaSection> = ({ title, type }) => {
	return (
		<div>
			<h2 className='text-[#FFF] text-[1.5625rem] bg-secondaryHover h-[2.125rem] flex justify-center items-center'>{title}</h2>
			<DangotekaSectionList type={type} />
		</div>
	)
}

export default DangotekaSection