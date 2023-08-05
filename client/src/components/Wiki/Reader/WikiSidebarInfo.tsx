import { FC } from 'react'

interface IWikiSidebarInfo { 
	isSidebarOpen: boolean
	type: string
	value: string
}

const WikiSidebarInfo: FC<IWikiSidebarInfo> = ({ isSidebarOpen, type, value }) => {
	// TODO: rewrite to types
	return (
		<>
			<div className={(isSidebarOpen ? '' : 'translate-x-[-150%]') + ' w-[9vw] h-[4.3%] bg-[#44B86B] flex justify-center items-center mt-[0.13rem] transition-all duration-1000 ease-out'}>
				<p className='font-secondary font-bold text-base text-[#FFF]'>{type}</p>
			</div>
			<div className={(isSidebarOpen ? '' : 'translate-x-[-150%]') + ' w-[9vw] h-[5.4%] bg-secondaryHover flex justify-center items-center mt-[0.13rem] transition-all duration-1000 ease-out'}>
				<p className='font-secondary font-normal text-[0.9375rem] text-center text-[#FFF]'>{value || '???'}</p>
			</div>
		</>
	)
}

export default WikiSidebarInfo