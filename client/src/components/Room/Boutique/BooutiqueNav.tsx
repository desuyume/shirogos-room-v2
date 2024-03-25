import { FC, useContext } from 'react'
import mainImg from '@/assets/room/boutique-main.svg'
import ordersImg from '@/assets/room/boutique-orders.svg'
import panopticonsImg from '@/assets/room/boutique-panopticons.svg'
import bgsBadgesImg from '@/assets/room/boutique-bgs-badges.svg'
import BoutiqueNavBttn from './BoutiqueNavBttn'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'

const BooutiqueNav: FC = () => {
	const links = [
		{ path: '', img: mainImg },
		{ path: '/orders', img: ordersImg },
		{ path: '/panopticons', img: panopticonsImg },
		{ path: '/store', img: bgsBadgesImg },
	]
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<div className='flex flex-col absolute top-[0.94rem] left-[1.12rem]'>
			{links.map(link => (
				<BoutiqueNavBttn
					key={link.path}
					path={link.path}
					img={link.img}
					bgColor={colorVariants.bg[roomAppearance.active_room_color]}
					bgColorHover={colorVariantsHover.bg[roomAppearance.active_room_color]}
					borderColor={colorVariants.border[roomAppearance.active_room_color]}
				/>
			))}
		</div>
	)
}

export default BooutiqueNav
