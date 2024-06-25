import { FC } from 'react'
import noProfilePic from '@/assets/no-profile-picture-icon.webp'
import { isUrl } from '@/utils/isUrl'
import { cn } from '@/utils/cn'
import { IFrame } from '@/types/frame.interface'

interface IProfileMiniature {
	miniature_img: string | null
	profile_img: string | null
	username: string
	frame: IFrame | null
	className?: string
	containerHeight?: string
}

const ProfileMiniature: FC<IProfileMiniature> = ({
	miniature_img,
	profile_img,
	username,
	frame,
	className,
	containerHeight,
}) => {
	return (
		<div style={{ height: containerHeight }} className='relative z-30'>
			<img
				className={cn(className)}
				src={
					!!miniature_img
						? `${import.meta.env.VITE_SERVER_URL}/${miniature_img}`
						: !!profile_img
						? isUrl(profile_img)
							? profile_img
							: `${import.meta.env.VITE_SERVER_URL}/${profile_img}`
						: noProfilePic
				}
				alt={`${username}-pic`}
			/>
			{!!frame && (
				<img
					className='min-w-[calc(100%*1.155)] max-w-[calc(100%+14px)] aspect-[104/83] absolute -top-[2px] -right-[2px] select-none pointer-events-none'
					src={`${import.meta.env.VITE_SERVER_URL}/${frame.img}`}
					alt='frame'
				/>
			)}
		</div>
	)
}

export default ProfileMiniature
