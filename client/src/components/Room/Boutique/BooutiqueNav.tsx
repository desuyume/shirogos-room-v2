import { FC } from 'react'
import mainImg from '@/assets/room/boutique-main.svg'
import ordersImg from '@/assets/room/boutique-orders.svg'
import panopticonsImg from '@/assets/room/boutique-panopticons.svg'
import bgsBadgesImg from '@/assets/room/boutique-bgs-badges.svg'
import BoutiqueNavBttn from './BoutiqueNavBttn'

const BooutiqueNav: FC = () => {
	const links = [
		{ path: '', img: mainImg },
		{ path: '/orders', img: ordersImg },
		{ path: '/panopticons', img: panopticonsImg },
		{ path: '/store', img: bgsBadgesImg },
	]

	return (
		<div className='flex flex-col absolute top-[0.94rem] left-[1.12rem]'>
			{links.map(link =>
				<BoutiqueNavBttn key={link.path} path={link.path} img={link.img} />	
			)}
		</div>
	)
}

export default BooutiqueNav