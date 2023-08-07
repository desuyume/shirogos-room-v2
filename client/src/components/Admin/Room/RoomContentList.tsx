import { FC } from 'react'
import RoomContentItem from './RoomContentItem'
import { Scrollbar } from 'react-scrollbars-custom'

const RoomContentList: FC = () => {
	const items = [
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
		{ cost: 50, img: '' },
	]
	return (
		<Scrollbar noDefaultStyles style={{ height: '28.8125rem' }}>
			<div className='w-full bg-secondary py-[1.2rem]'>
				{items.map(item => (
					<RoomContentItem
						key={item.cost + item.img}
						cost={item.cost}
						img={item.img}
					/>
				))}
			</div>
		</Scrollbar>
	)
}

export default RoomContentList
