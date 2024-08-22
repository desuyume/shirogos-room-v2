import { FC, useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { useUserProfile } from '@/api/useUserProfile'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import ProfileMiniature from '@/components/ProfileMiniature'
import Notification from '@/components/Notification/Notification'

const Profile: FC = () => {
  const [isLinkHover, setIsLinkHover] = useState<boolean>(false)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { data: profile, isLoading, isError } = useUserProfile()

  return isLoading || isError ? (
    <></>
  ) : (
    <div className='absolute right-8 flex items-center'>
      <Notification className='mr-8' />

      <Link
        onMouseEnter={() => setIsLinkHover(true)}
        onMouseOut={() => setIsLinkHover(false)}
        className='group mr-[0.62rem]'
        to='/room'
      >
        <ProfileMiniature
          miniature_img={profile.miniature_img}
          profile_img={profile.profile_img}
          username={profile.username ?? profile.twitch.displayName}
          frame={profile.frame}
          className='h-[4.5rem] w-[5.625rem]'
          withHoverEffect
        />
      </Link>

      <div className='flex flex-col items-center'>
        <p className='mb-[0.13rem] text-xs leading-[1.0625rem] text-primaryText'>
          {profile?.level} уровень
        </p>
        <p
          className={
            (isLinkHover
              ? `${colorVariants.text[roomAppearance.active_username_color]}`
              : 'text-primaryText') + ' mb-[0.13rem] text-base leading-[1.0625rem]'
          }
        >
          {profile?.username}
        </p>
        <p className='text-[0.8125rem] leading-[1.0625rem] text-[#EBE984]'>{profile?.dangos} до</p>
      </div>
    </div>
  )
}

export default Profile
