import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import profileImg from '@/assets/room/profile-img.png'
import ChangeSetting from '../Settings/ChangeSetting'
import ChangeGender from '../Settings/ChangeGender'
import Connections from '../Settings/Connections'

const RoomSettings: FC = () => {
	const location = useLocation()
	const isActive = location.pathname.includes('/room/settings')

	const user = {
		img: profileImg,
		username: 'mercenaryJulian',
		birthday: '10.10.2000',
		gender: 'male',
		discord: {
			isConnected: false,
		},
		telegram: {
			isConnected: false,
		},
		twitch: {
			isConnected: true,
			displayName: 'mercenaryJulian',
		},
		vk: {
			isConnected: true,
			displayName: 'Николай Пещеркин',
		},
	}
	const [username, setUsername] = useState<string>(user.username)
	const [birthday, setBirthday] = useState<string>(user.birthday)
	const [gender, setGender] = useState<string>(user.gender)

	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' transition-all w-full bg-tertiary rounded-[2.3125rem] pt-[1.56rem] pl-8 pr-[1.52rem] pb-[19.25rem] flex justify-between'
			}
		>
			<div className='rounded-tl-[1.25rem] border-[1px] border-[#646464] w-[66%] h-[36.375rem] pb-7 px-4'>
				<ChangeSetting
					type='nickname'
					initialValue={user.username}
					value={username}
					setValue={setUsername}
				/>
				<ChangeSetting
					type='birthday'
					initialValue={user.birthday}
					value={birthday}
					setValue={setBirthday}
				/>
				<ChangeGender gender={gender} setGender={setGender} />
				<Connections discord={user.discord} telegram={user.telegram} twitch={user.twitch} vk={user.vk} />
			</div>
			<div className='w-[32%]'>
				<img
					className='w-full mb-[0.62rem] rounded-[1.5625rem]'
					src={user.img}
					alt='profile-img'
				/>
				<button className='w-full bg-secondaryHover h-[3.1875rem] text-xl text-primaryText mb-[0.62rem] hover:bg-secondary transition-all'>
					Изменить миниатюру
				</button>
				<button className='w-full bg-primary text-primaryText text-xl h-[3.9375rem] hover:bg-primaryHover transition-all'>
					Изменить аватарку
				</button>
			</div>
		</div>
	)
}

export default RoomSettings
