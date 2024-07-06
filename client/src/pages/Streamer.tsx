import DonatesMarquee from '@/components/Donates/DonatesMarquee'
import Header from '@/layout/Header/Header'
import { FC, useState } from 'react'
import Chronicles from '@/components/Chronicles/Chronicles'
import watchTableImg from '@/assets/watch-table.png'
import watchTableHoverImg from '@/assets/watch-table-hover.png'
import Orders from '@/components/Orders/Orders'

const Streamer: FC = () => {
	const [isDocsHover, setIsDocsHover] = useState<boolean>(false)

	return (
		<>
			<Header isFixed={false} withLine={false} />
			<div className='w-full aspect-[16/9] bg-streamer-bg bg-no-repeat bg-cover bg-center relative'>
				<DonatesMarquee />
				<div className='w-[62.875rem] flex items-center mt-[31.125rem] ml-[21rem]'>
					<Orders />
				</div>
				<Chronicles />
				<a
					onMouseOver={() => setIsDocsHover(true)}
					onMouseLeave={() => setIsDocsHover(false)}
					href='https://docs.google.com/spreadsheets/d/1Qa0lxGo0qPGpLf2k2HsfinIy6zfg7MYlgWGRsG88Eac/edit?usp=sharing'
					target='_blank'
				>
					<img
						className='w-[103px] absolute bottom-[20.8125rem] left-[8.125rem]'
						src={isDocsHover ? watchTableHoverImg : watchTableImg}
						alt='docs-icon'
					/>
				</a>
			</div>
		</>
	)
}

export default Streamer
