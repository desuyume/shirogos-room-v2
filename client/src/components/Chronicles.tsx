import { FC } from 'react'
import ChroniclesList from './ChroniclesList'

interface IChronicles { 
	isActive: boolean
}

const Chronicles: FC<IChronicles> = ({ isActive }) => {
	return (
		<div className={(isActive ? 'visible opacity-100' : 'invisible opacity-0') + ' bg-tertiary bg-opacity-40 w-[13.1875rem] absolute left-0 top-[5.38rem] pt-[1.25rem] pb-[0.63rem] pl-[0.4rem] pr-[0.94rem] transition-all'}>
			<div className='w-[11.9375rem] h-[1.875rem] flex justify-center items-center bg-secondaryHover px-[0.19rem] relative mb-[0.62rem]'>
				<button className='bg-primary w-[4.7%] h-[77%] hover:bg-primaryHover absolute left-[0.19rem] hover:w-[0.8125rem] transition-all' />
				<p className='text-primaryText text-[0.9375rem]'>Август 2018</p>
				<button className='bg-primary w-[4.7%] h-[77%] hover:bg-primaryHover absolute right-[0.19rem] hover:w-[0.8125rem] transition-all' />
			</div>
			<ChroniclesList />
		</div>
	)
}

export default Chronicles