import { FC } from 'react'
import bgVideo from '../assets/shirogo.mp4'

const SecondScreen: FC = () => {
	return (
		<div className='h-screen'>
			<video 
				className='w-full h-full object-cover'
				src={bgVideo}
				autoPlay
				loop
				muted
			/>
		</div>
	);
};

export default SecondScreen;