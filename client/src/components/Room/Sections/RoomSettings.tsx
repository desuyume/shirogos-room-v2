import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChangeGender from '../Settings/ChangeGender'
import Connections from '../Settings/Connections'
import { useUserInfo } from '@/api/useUserInfo'
import ChangeUsername from '../Settings/ChangeUsername'
import ChangeBirthday from '../Settings/ChangeBirthday'
import ChangeProfileImg from '../Settings/ChangeProfileImg'
import { isUrl } from '@/utils/isUrl'

const RoomSettings: FC = () => {
	const location = useLocation()
	const isActive = location.pathname.includes('/room/settings')

	const { isLoading, isError, isSuccess, data: userInfo } = useUserInfo()

	const [username, setUsername] = useState<string>('')
	const [birthday, setBirthday] = useState<Date | null>(null)
	const [gender, setGender] = useState<string>('')

	useEffect(() => {
		if (!isLoading) {
			if (isSuccess) {
				setUsername(userInfo?.username)
				setBirthday(userInfo?.birthday ? new Date(userInfo?.birthday) : null)
				setGender(String(userInfo?.gender))
			}
		}
	}, [isLoading])

	return isLoading ? (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' w-full h-[65.5625rem] bg-tertiary rounded-[2.3125rem] flex justify-center items-center'
			}
		>
			<p className='text-xl text-center'>Загрузка...</p>
		</div>
	) : isError ? (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' w-full h-[65.5625rem] flex justify-center rounded-[2.3125rem] items-center'
			}
		>
			<p className='text-xl text-center'>Ошибка</p>
		</div>
	) : (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' w-full bg-tertiary rounded-[2.3125rem] pt-[1.56rem] pl-8 pr-[1.52rem] pb-[19.25rem] flex justify-between'
			}
		>
			<div className='rounded-tl-[1.25rem] border-[1px] border-[#646464] w-[66%] h-[36.375rem] pb-7 px-4'>
				<ChangeUsername
					initialValue={userInfo.username}
					value={username}
					setValue={setUsername}
				/>
				<ChangeBirthday
					initialValue={userInfo.birthday}
					value={birthday}
					setValue={setBirthday}
				/>
				<ChangeGender gender={gender} setGender={setGender} />
				<Connections
					discord={userInfo.discord}
					telegram={userInfo.telegram}
					twitch={userInfo.twitch}
					vk={userInfo.vk}
				/>
			</div>
			<div className='w-[32%]'>
				<img
					className='w-full mb-[0.62rem] rounded-[1.5625rem]'
					src={
						isUrl(userInfo.profile_img ?? '')
							? userInfo.profile_img
							: `${import.meta.env.VITE_SERVER_URL}/${userInfo.profile_img}`
					}
					alt='profile-img'
				/>
				<button className='w-full bg-secondaryHover h-[3.1875rem] text-xl text-primaryText mb-[0.62rem] hover:bg-secondary transition-all'>
					Изменить миниатюру
				</button>
				<ChangeProfileImg />
			</div>
		</div>
	)
}

export default RoomSettings
