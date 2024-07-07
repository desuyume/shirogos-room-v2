import DonatesMarquee from '@/components/Donates/DonatesMarquee'
import Header from '@/layout/Header/Header'
import { FC, useState } from 'react'
import Chronicles from '@/components/Chronicles/Chronicles'
import watchTableImg from '@/assets/watch-table.png'
import watchTableHoverImg from '@/assets/watch-table-hover.png'
import Orders from '@/components/Orders/Orders'
import { cn } from '@/utils/cn'

const Streamer: FC = () => {
	const [isDocsHover, setIsDocsHover] = useState<boolean>(false)

	return (
		<>
			<Header isFixed={false} withLine={false} />
			<div className='w-full aspect-[16/9] bg-streamer-bg bg-no-repeat bg-cover bg-center relative pb-4'>
				<DonatesMarquee />
				<Orders className='mt-[31.125rem] ml-[21rem]' />
				<Chronicles />
				<a
					className='w-[103px] h-[154.33px] absolute top-[37.5rem] left-[8.125rem] hover:scale-[1.6] transition-all'
					onMouseOver={() => setIsDocsHover(true)}
					onMouseLeave={() => setIsDocsHover(false)}
					href='https://docs.google.com/spreadsheets/d/1Qa0lxGo0qPGpLf2k2HsfinIy6zfg7MYlgWGRsG88Eac/edit?usp=sharing'
					target='_blank'
				>
					<div className='relative'>
						<img
							className={cn('w-[103px] h-[154.33px] absolute transition-all', {
								'visible opacity-100': !isDocsHover,
								'invisible opacity-0': isDocsHover,
							})}
							src={watchTableImg}
							alt='docs-icon'
						/>
						<img
							className={cn('w-[103px] h-[154.33px] absolute transition-all', {
								'visible opacity-100': isDocsHover,
								'invisible opacity-0': !isDocsHover,
							})}
							src={watchTableHoverImg}
							alt='docs-icon'
						/>
					</div>
				</a>
			</div>
		</>
	)
}

export default Streamer
