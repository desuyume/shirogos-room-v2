import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import profileImg from '@/assets/room/profile-img.png'

const RoomMain: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room' || location.pathname === '/room/'

	const user = {
		img: profileImg,
		username: 'mercenaryJulian',
		level: 1,
	}

	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') + ' transition-all flex justify-between'
			}
		>
			<div className='flex-1 mr-[1.38rem]'>
				<div className='bg-tertiary w-full flex flex-col justify-center items-center h-[4.875rem] rounded-[2.3125rem] mb-[1.13rem]'>
					<p className='text-primaryText text-xl leading-[97.795%]'>Комната</p>
					<p className='text-primaryText text-[1.875rem] leading-[97.795%]'>
						НАШ АМБАР
					</p>
				</div>
				<div className='bg-secondaryHover bg-opacity-75 rounded-[2.3125rem] w-full h-[59.5625rem]'></div>
			</div>
			<div className='w-[14.625rem] flex flex-col justify-between'>
				<div className='bg-[#D9D9D9] h-[37%] rounded-[1.5625rem] pb-[0.12rem]'>
					<img
						className='rounded-[1.5625rem] mb-3'
						src={user.img}
						alt='profile-img'
					/>
					<div className='bg-[#D9D9D9] z-20'>
						<p className='text-primary text-xl leading-[97.795%] text-center mb-[0.81rem] z-20'>
							{user.username}
						</p>
					</div>

					<div className='relative w-full h-[2.375rem] flex justify-center items-center z-10'>
						<p className='text-primaryText text-[0.9375rem]'>
							Уровень {user.level}
						</p>
						<div className='bg-[#4A9648] w-full h-[4.4375rem] absolute bottom-0 -z-10 rounded-[1.5625rem]' />
					</div>
				</div>
				<div className='bg-secondaryHover h-[61%]'></div>
			</div>
		</div>
	)
}

export default RoomMain
