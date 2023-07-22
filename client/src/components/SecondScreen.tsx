import { FC } from 'react'
import bgVideo from '../assets/shirogo.mp4'
import Almanac from './Almanac'
import { Link } from 'react-router-dom'
import OnlineUser from './OnlineUser'
import News from './News'

const SecondScreen: FC = () => {
	return (
		<div className='h-[1041px] relative overflow-hidden'>
			<video 
				className='w-full h-full object-cover'
				src={bgVideo}
				autoPlay
				loop
				muted
			/>
			<Link to='/chronicles' className='bg-primary text-center rounded-[56px] w-[161px] h-[28px] absolute top-4 left-[-20px] text-primaryText text-xl hover:bg-primaryHover hover:w-[251px] hover:left-[-40px] transition-all'>Хроники</Link>
			<Almanac />
			<OnlineUser />
			<News />
		</div>
	);
};

export default SecondScreen;