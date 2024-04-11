import { IRatingUser } from '@/types/rating.interface'
import { FC } from 'react'
import noProfilePic from '@/assets/no-profile-picture-icon.webp'
import { Link } from 'react-router-dom'
import { isUrl } from '@/utils/isUrl'

interface IRatingItem {
	user: IRatingUser
	place: 'first' | 'second' | 'third'
}

const RatingItem: FC<IRatingItem> = ({ user, place }) => {
	return (
		<div
			className={
				(place === 'first'
					? 'w-[21.5rem] h-[4.375rem] '
					: 'w-[17rem] h-[3.53125rem] ') +
				'flex items-center mb-3 last-of-type:mb-0'
			}
		>
			<p
				className={
					(place === 'first' ? 'text-[1.875rem] mr-6 ' : 'text-xl mr-4 ') +
					'font-secondary font-bold leading-[97.8%] text-primaryText'
				}
			>
				#{place === 'first' ? 1 : place === 'second' ? 2 : 3}
			</p>
			<Link
				className={
					(place === 'first' ? 'mr-8 ' : 'mr-[1.71875rem] ') +
					'h-full aspect-[85/70] rounded-[0.6875rem] outline outline-transparent outline-[3px] hover:outline-primary cursor-pointer transition-all'
				}
				to={`/guide/${user.username}?from=guidePreview`}
			>
				<img
					className={'h-full rounded-[0.6875rem] aspect-[85/70] object-cover'}
					src={
						!!user.miniature_img
							? `${import.meta.env.VITE_SERVER_URL}/${user.miniature_img}`
							: !!user.profile_img
							? isUrl(user.profile_img)
								? user.profile_img
								: `${import.meta.env.VITE_SERVER_URL}/${user.profile_img}`
							: noProfilePic
					}
					alt={`${user.username}-pic`}
				/>
			</Link>

			<div
				className={
					(place === 'first' ? 'max-w-[10.375rem] ' : 'max-w-[8.375rem] ') +
					'flex flex-col flex-1'
				}
			>
				<p
					className={
						(place === 'first' ? 'text-xl mb-0.5 ' : 'text-[0.6875rem] ') +
						(place === 'second' ? 'text-[#34A3AA] ' : 'text-[#EBE984] ') +
						'font-secondary font-bold leading-none break-words'
					}
				>
					{user.username}
				</p>
				<p
					className={
						(place === 'first' ? 'text-[0.9375rem] ' : 'text-[0.625rem] ') +
						'text-primaryText font-secondary font-bold'
					}
				>
					{user.level} уровень
				</p>
			</div>
		</div>
	)
}

export default RatingItem
