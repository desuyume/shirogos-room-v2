import { FC, useContext, useState } from 'react'
import PastUsernames from './PastUsernames'
import { IPastUsername, IRoomAppearance } from '@/types/room.interface'
import { isUrl } from '@/utils/isUrl'
import noProfilePictureIcon from '@/assets/no-profile-picture-icon.webp'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import LevelBar from './LevelBar'

interface IUserInfoBar {
	profile_img: string | null
	username: string
	past_usernames?: IPastUsername[]
	level: number
	exp: number
	isGuide?: boolean
	guideRoomAppearance?: IRoomAppearance
}

const UserInfoBar: FC<IUserInfoBar> = ({
	profile_img,
	username,
	past_usernames,
	level,
	exp,
	isGuide,
	guideRoomAppearance,
}) => {
	const [isPastUsernamesVisible, setIsPastUsernamesVisible] =
		useState<boolean>(false)
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<div className='bg-primaryText h-[24.375rem] relative flex flex-col items-center rounded-[1.5625rem] mb-[0.5625rem]'>
			<div className='w-full h-[80%] rounded-t-[1.5625rem] bg-primaryText z-30'>
				{!!profile_img ? (
					<img
						className='rounded-[1.5rem] w-full h-full object-cover'
						src={
							isUrl(profile_img)
								? profile_img
								: `${import.meta.env.VITE_SERVER_URL}/${profile_img}`
						}
						alt='profile-img'
					/>
				) : (
					<img
						className='rounded-[1.5rem] w-full h-full object-cover'
						src={noProfilePictureIcon}
						alt='profile-img'
					/>
				)}
			</div>
			<div className='w-full h-[2.4375rem] flex justify-center items-center bg-primaryText rounded-b-[1.5625rem] z-20 relative'>
				<p
					className={
						(isGuide
							? `${
									colorVariants.text[
										guideRoomAppearance?.active_username_color ?? 'pink'
									]
							  } `
							: `${
									colorVariants.text[roomAppearance.active_username_color]
							  } `) +
						`text-xl leading-[97.795%] text-center max-w-[11.75rem] overflow-ellipsis whitespace-nowrap overflow-hidden`
					}
				>
					{username}
				</p>
				<button
					onClick={() => setIsPastUsernamesVisible(!isPastUsernamesVisible)}
					className={
						(isPastUsernamesVisible
							? isGuide
								? `${
										colorVariants.border[
											guideRoomAppearance?.active_room_color ?? 'pink'
										]
								  } `
								: `${colorVariants.border[roomAppearance.active_room_color]} `
							: 'border-t-tertiary ') +
						`border-[0.4375rem] border-l-transparent border-r-transparent border-b-transparent border-t-[0.4375rem] ` +
						(isGuide
							? `${
									colorVariantsHover.border[
										guideRoomAppearance?.active_room_color ?? 'pink'
									]
							  }`
							: `${
									colorVariantsHover.border[roomAppearance.active_room_color]
							  }`) +
						` hover:border-l-transparent hover:border-r-transparent hover:border-b-transparent transition-all absolute right-[0.56rem] top-6`
					}
				/>
				<PastUsernames
					isVisible={isPastUsernamesVisible}
					usernames={past_usernames}
					className='top-8 right-[0.6rem]'
					isGuide={isGuide}
					guideRoomAppearance={guideRoomAppearance}
				/>
			</div>
			<LevelBar level={level} exp={exp} />
		</div>
	)
}

export default UserInfoBar
