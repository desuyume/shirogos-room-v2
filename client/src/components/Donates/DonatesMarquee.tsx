import { FC, useState } from 'react'
import Marquee from 'react-fast-marquee'
import { IDonate } from '@/types/types'
import DonateItemMarquee from './DonateItemMarquee'

const DonatesMarquee: FC = () => {
	const [donates, _] = useState<IDonate[] | null>([
		{ nickname: 'Mode_Of_God', amount: '15.810' },
		{
			nickname: 'Metalfol',
			amount: '13.770',
			gifts: 'Absolver + Tales of Zestiria',
		},
		{ nickname: 'WaterYay', amount: '6.811,32' },
		{ nickname: 'Des', gifts: 'Pudge Arcane' },
	])

	return (
		<Marquee className='bg-secondary py-3' autoFill={true} pauseOnHover={true}>
			{donates?.map(donate => (
				<DonateItemMarquee
					key={donate.nickname}
					nickname={donate.nickname}
					amount={donate.amount}
					gifts={donate.gifts}
				/>
			))}
		</Marquee>
	)
}

export default DonatesMarquee
