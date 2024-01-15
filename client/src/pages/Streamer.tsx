import DonatesMarquee from '@/components/Donates/DonatesMarquee'
import Header from '@/layout/Header/Header'
import { FC, useState } from 'react'
import rouletteImg from '@/assets/roulette.png'
import Chronicles from '@/components/Chronicles/Chronicles'
import docsIcon from '@/assets/docs.png'
import docsIconHover from '@/assets/docs-hover.png'
import Orders from '@/components/Orders/Orders'

const Streamer: FC = () => {
	const [isDocsHover, setIsDocsHover] = useState<boolean>(false)

	return (
		<div>
			<Header isFixed={false} withLine={false} />
			<div className='w-full aspect-[16/9] bg-streamer-bg bg-no-repeat bg-cover bg-center relative'>
				<DonatesMarquee />
				<div className='w-[62.875rem] flex items-center mt-[7.19rem] ml-[3.13rem]'>
					<Orders />
					<img
						src={rouletteImg}
						className='w-[24.5625rem] h-[18.375rem] -ml-2'
					/>
				</div>
				<Chronicles />
				<a
					onMouseOver={() => setIsDocsHover(true)}
					onMouseLeave={() => setIsDocsHover(false)}
					href='https://docs.google.com/spreadsheets/d/1Qa0lxGo0qPGpLf2k2HsfinIy6zfg7MYlgWGRsG88Eac/edit?usp=sharing'
					target='_blank'
				>
					<img
						className='w-[8.1875rem] h-[8.1875rem] absolute bottom-5 left-[0.56rem]'
						src={isDocsHover ? docsIconHover : docsIcon}
						alt='docs-icon'
					/>
				</a>
			</div>
		</div>
	)
}

export default Streamer
