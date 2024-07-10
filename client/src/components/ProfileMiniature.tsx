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
	withHoverEffect?: boolean
}

const ProfileMiniature: FC<IProfileMiniature> = ({
	miniature_img,
	profile_img,
	username,
	frame,
	className,
	containerHeight,
	withHoverEffect = false,
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
					className='min-w-[calc(100%*1.155)] max-w-[calc(100%+14px)] aspect-[104/83] absolute -top-[2px] -right-[2px] z-10 select-none pointer-events-none'
					src={`${import.meta.env.VITE_SERVER_URL}/${frame.img}`}
					alt='frame'
				/>
			)}

			{withHoverEffect && (
				<div className='w-full h-full absolute inset-0 bg-[#383134] bg-opacity-70 opacity-0 invisible transition-opacity group-hover:opacity-100 group-hover:visible flex justify-center items-center duration-300 pointer-events-none'>
					<p className='text-primaryText text-opacity-[0.55] text-[0.9375rem]'>
						ГОУ!
					</p>
				</div>
			)}
		</div>
	)
}

export default ProfileMiniature
