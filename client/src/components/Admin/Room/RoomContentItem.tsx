import { FC } from 'react'

interface IRoomContentItem { 
	cost: number
	img?: string
}

const RoomContentItem: FC<IRoomContentItem> = ({ cost, img }) => {
	return (
		<div className='flex justify-center items-center mb-[0.63rem] last-of-type:mb-0'>
			<p className='font-secondary font-bold text-xl text-[#FFF] mr-11'>{cost} ДО</p>
			{img
				?
				<img src={img} alt='panopticon-img' />
				:
				<div className='w-[7.25rem] h-[4.75rem] bg-[#D9D9D9]' />
			}
		</div>
	)
}

export default RoomContentItem