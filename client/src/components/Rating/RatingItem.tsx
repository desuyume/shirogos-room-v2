import { FC } from 'react'
import ProfileMiniature from '../ProfileMiniature'
import { IRatingUser } from '@/types/rating.interface'
import { cn } from '@/utils/cn'

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

			<ProfileMiniature
				miniature_img={user.miniature_img}
				profile_img={user.profile_img}
				username={user.username ?? user.twitch.displayName}
				frame={user.frame}
				containerClassName={cn({
					'mr-8': place === 'first',
					'mr-[1.71875rem]': place !== 'first',
				})}
				className={cn('rounded-[0.6875rem] aspect-[85/70] object-cover', {
					'w-[5.3125rem]': place === 'first',
					'w-[4.25rem]': place !== 'first',
				})}
			/>

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
					{user.username ?? user.twitch.displayName}
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
