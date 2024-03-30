import { FC } from 'react'
import bgVideo from '@/assets/shirogo.mp4'
import Almanac from '@/components/Almanac/Almanac'
import OnlineUser from '@/components/OnlineUser/OnlineUser'
import News from '@/components/News/News'
import Rating from '../Rating/Rating'

const SecondScreen: FC = () => {
	return (
		<div className='h-[65.0625rem] relative overflow-hidden'>
			<video
				className='w-full h-full object-cover'
				src={bgVideo}
				autoPlay
				loop
				muted
			/>
			<div className='w-[66rem] h-full flex flex-col items-center absolute right-6 top-[3.81rem]'>
				<News />
				<div className='w-full h-[26.0625rem] bg-secondary bg-opacity-40 rounded-[2.3125rem] mb-[1.31rem]' />
				<div className='w-full flex flex-col justify-between items-center flex-1'>
					<div className='w-full flex pl-[3.5rem]'>
						<Rating className='mr-[0.9375rem]' />
						<Almanac />
					</div>
					<OnlineUser />
				</div>
			</div>
			
		</div>
	)
}

export default SecondScreen
