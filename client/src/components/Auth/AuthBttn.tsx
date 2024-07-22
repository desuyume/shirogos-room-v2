import { FC, useState } from 'react'
import twitchHoveredIcon from '@/assets/auth/twitch-hover.png'
import { IAuthBttn } from './AuthModal'
import { cn } from '@/utils/cn'

interface AuthBttnProps {
	bttn: IAuthBttn
}

const AuthBttn: FC<AuthBttnProps> = ({
	bttn: { service, icon, clickEvent, isDisabled },
}) => {
	const [isTwtichHovered, setIsTwtichHovered] = useState<boolean>(false)

	return (
		<button
			className={cn(
				'mb-3 last:mb-0 [&:nth-last-child(2)]:mb-0 transition-opacity',
				{
					'opacity-50': service !== 'Twitch',
					'hover:opacity-100': service !== 'Twitch' && !isDisabled,
				}
			)}
			disabled={isDisabled}
			onClick={clickEvent}
			onMouseOver={() => setIsTwtichHovered(true)}
			onMouseLeave={() => setIsTwtichHovered(false)}
		>
			{service === 'Twitch' ? (
				<img src={isTwtichHovered ? twitchHoveredIcon : icon} alt='auth-icon' />
			) : (
				<img src={icon} alt='auth-icon' />
			)}
		</button>
	)
}

export default AuthBttn
