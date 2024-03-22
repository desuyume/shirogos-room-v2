import { FC } from 'react'
import UserInfoBar from './UserInfoBar'
import UserAchievementsBar from './UserAchievementsBar'
import { IPastUsername } from '@/types/room.interface'

interface IUserBar {
	profile_img: string | null
	username: string
	past_usernames: IPastUsername[]
	level: number
	created_at: Date
	className?: string
}

const UserBar: FC<IUserBar> = ({
	profile_img,
	username,
	past_usernames,
	level,
	created_at,
	className
}) => {
	return (
		<div className={'w-[14.625rem] h-full flex flex-col transition-all ' + className}>
			<UserInfoBar
				profile_img={profile_img}
				username={username}
				past_usernames={past_usernames}
				level={level}
			/>
			<UserAchievementsBar created_at={created_at} />
		</div>
	)
}

export default UserBar
