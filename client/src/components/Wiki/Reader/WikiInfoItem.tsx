import HTMLReactParser from 'html-react-parser'
import { FC } from 'react'

interface IWikiInfoItem { 
	type: string
	value: string
}

const WikiInfoItem: FC<IWikiInfoItem> = ({ type, value }) => {
	return (
		<div className='flex mb-[0.94rem] last-of-type:mb-0'>
			<div className='w-[10.375rem] bg-tertiary bg-opacity-80 flex justify-center items-center mr-6'>
				<p className='font-secondary font-normal text-xl text-[#FFF] text-center'>{type}</p>
			</div>
			<p className='text-[#FFF] font-secondary text-[1.125rem] w-[43.125rem] py-[0.7rem]'>{HTMLReactParser(value)}</p>
		</div>
	)
}

export default WikiInfoItem