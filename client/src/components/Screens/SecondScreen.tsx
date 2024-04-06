import { FC, useEffect, useState } from 'react'
import bgVideo from '@/assets/shirogo.mp4'
import Almanac from '@/components/Almanac/Almanac'
import OnlineUser from '@/components/OnlineUser/OnlineUser'
import News from '@/components/News/News'
import Rating from '../Rating/Rating'
import RoomGuidePreview from '../RoomGuide/RoomGuidePreview'
import RoomGuideScreen from '../RoomGuide/RoomGuideScreen'
import { useSearchParams } from 'react-router-dom'

const SecondScreen: FC = () => {
	const [isRoomGuideScreenVisible, setIsRoomGuideScreenVisible] =
		useState<boolean>(false)
	const [searchParams, setSearchParams] = useSearchParams()

	const moveToGuide = (section: 'screen' | 'preview') => {
		if (section === 'preview') {
			setIsRoomGuideScreenVisible(false)
		} else {
			setIsRoomGuideScreenVisible(true)
		}

		window.scrollTo({
			top: 908,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		if (searchParams.get('to') === 'guideScreen') {
			searchParams.delete('to')
			setSearchParams(searchParams)
			moveToGuide('screen')
		}

		if (searchParams.get('to') === 'guidePreview') {
			searchParams.delete('to')
			setSearchParams(searchParams)
			moveToGuide('preview')
		}
	}, [])

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
				<RoomGuidePreview
					setIsRoomGuideScreenVisible={setIsRoomGuideScreenVisible}
				/>
				<div className='w-full flex flex-col justify-between items-center flex-1'>
					<div className='w-full flex pl-[3.5rem]'>
						<Rating className='mr-[0.9375rem]' />
						<Almanac />
					</div>
					<OnlineUser />
				</div>
			</div>

			<RoomGuideScreen
				isVisible={isRoomGuideScreenVisible}
				setIsVisible={setIsRoomGuideScreenVisible}
			/>
		</div>
	)
}

export default SecondScreen
