import { FC, useState } from 'react'
import CreateRoomHeader from '../components/CreateRoomHeader'
import CreateRoomForm from '../components/CreateRoomForm'
import shirogoImg from '../assets/create-room-img.png'

const CreateRoom: FC = () => {
	const twitchNickname = 'mercenaryJulian'
	const [nickname, setNickname] = useState<string>(twitchNickname)

	return (
		<div className='bg-[#DEDEDE]'>
			<CreateRoomHeader />
			<p className='text-[#D9D9D9] text-[3.125rem] font-secondary font-bold text-center absolute top-[2.62rem] left-[50%] translate-x-[-50%] z-20 tracking-[-0.1875rem] leading-[95.5%]'>
				Привет, <br />
				<span className='text-primary text-[2.5rem] tracking-[-0.15rem]'>
					{twitchNickname}
				</span>
				!
			</p>
			<div className='flex justify-center lg:mr-[3.57rem]'>
				<CreateRoomForm nickname={nickname} setNickname={setNickname} />
			</div>
			<img
				className='hidden lg:block h-screen absolute bottom-0 left-[45%] pointer-events-none'
				src={shirogoImg}
				alt='shirogo-img'
			/>
		</div>
	)
}

export default CreateRoom
