import { FC } from 'react'
import Marquee from 'react-fast-marquee'
import DonateItemMarquee from './DonateItemMarquee'
import { useDonates } from '@/api/useDonates'

const DonatesMarquee: FC = () => {
	const { isLoading, data: donates, isError } = useDonates()

	return isLoading ? (
		<div className='h-[3.25rem] flex justify-center items-center bg-secondary'>
			Загрузка...
		</div>
	) : isError ? (
		<div className='h-[3.25rem] flex justify-center items-center bg-secondary'>
			<p>Что-то пошло не так 0_0</p>
		</div>
	) : donates.length ? (
		<Marquee className='bg-secondary py-3' autoFill={true} pauseOnHover={true}>
			{donates?.map(
				donate =>
					(!!donate.amount || !!donate.gifts) && (
						<DonateItemMarquee
							key={donate.id}
							username={donate.username}
							amount={donate.amount}
							gifts={donate.gifts}
						/>
					)
			)}
		</Marquee>
	) : (
		<div className='h-[3.25rem] flex justify-center items-center bg-secondary'>
			<p>Донатов нет :(</p>
		</div>
	)
}

export default DonatesMarquee
