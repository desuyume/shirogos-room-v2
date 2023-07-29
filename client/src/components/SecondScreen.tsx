import { FC, useState } from 'react'
import bgVideo from '../assets/shirogo.mp4'
import Almanac from './Almanac'
import OnlineUser from './OnlineUser'
import News from './News'
import Orders from './Orders'
import PastOrders from './PastOrders'
import Chronicles from './Chronicles'

const SecondScreen: FC = () => {
	const [isPastOrders, setIsPastOrders] = useState<boolean>(false)
	const [isChroniclesActive, setIsChroniclesActive] = useState<boolean>(false)

	return (
		<div className='h-[1041px] relative overflow-hidden'>
			<video 
				className='w-full h-full object-cover'
				src={bgVideo}
				autoPlay
				loop
				muted
			/>
			<button 
				onClick={() => setIsChroniclesActive(!isChroniclesActive)}
				className={(isChroniclesActive && 'w-[251px] left-[-40px]') + ' bg-primary text-center rounded-[56px] w-[161px] h-[28px] absolute top-[4.44rem] left-[-20px] text-primaryText text-xl hover:bg-primaryHover hover:w-[251px] hover:left-[-40px] transition-all z-10'}>Хроники</button>
			<Chronicles isActive={isChroniclesActive} />
			<Almanac />
			<OnlineUser />
			<News />
			<Orders isPastOrders={isPastOrders} setIsPastOrders={setIsPastOrders} />
			<PastOrders isPastOrders={isPastOrders} setIsPastOrders={setIsPastOrders} />
		</div>
	);
};

export default SecondScreen;