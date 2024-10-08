import { FC } from 'react'
import UserInfoBar from './UserInfoBar'
import UserAchievementsBar from './UserAchievementsBar'
import { IPastUsername, IRoomAppearance } from '@/types/room.interface'

interface IUserBar {
  profile_img: string | null
  username: string
  twitchLogin: string
  past_usernames: IPastUsername[]
  level: number
  exp: number
  created_at: Date
  className?: string
  isGuide?: boolean
  guideRoomAppearance?: IRoomAppearance
}

const UserBar: FC<IUserBar> = ({
  profile_img,
  username,
  past_usernames,
  twitchLogin,
  level,
  exp,
  created_at,
  className,
  isGuide,
  guideRoomAppearance
}) => {
  return (
    <div className={'flex h-full w-[14.625rem] flex-col transition-all ' + className}>
      <UserInfoBar
        profile_img={profile_img}
        username={username}
        past_usernames={past_usernames}
        level={level}
        exp={exp}
        isGuide={isGuide}
        guideRoomAppearance={guideRoomAppearance}
      />
      <UserAchievementsBar
        created_at={created_at}
        twitchLogin={twitchLogin}
        isGuide={isGuide}
        guideRoomAppearance={guideRoomAppearance}
      />
    </div>
  )
}

export default UserBar
