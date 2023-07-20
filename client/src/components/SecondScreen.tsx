import { FC } from 'react'
import bgVideo from '../assets/shirogo.mp4'
import Almanac from './Almanac'

const SecondScreen: FC = () => {
	return (
		<div className='h-[1041px] relative'>
			<video 
				className='w-full h-full object-cover'
				src={bgVideo}
				autoPlay
				loop
				muted
			/>
			<Almanac />
		</div>
	);
};

export default SecondScreen;