import { FC, useState } from 'react';
import twitchHoveredIcon from '@/assets/auth/twitch-hover.png'

interface IAuthBttn {
	service: string
	icon: string
	clickEvent: () => void
}

const AuthBttn: FC<IAuthBttn> = ({ service, icon, clickEvent }) => {
	const [isTwtichHovered, setIsTwtichHovered] = useState<boolean>(false)

	return service === 'Twitch' ? (
		<button
			className='mb-3'
			onClick={clickEvent}
			onMouseOver={() => setIsTwtichHovered(true)}
			onMouseLeave={() => setIsTwtichHovered(false)}
		>
			<img src={isTwtichHovered ? twitchHoveredIcon : icon} alt='auth-icon' />
		</button>
	) : (
		<button
			className={
				(service !== 'Twitch' && 'opacity-50 hover:opacity-100') +
				' mb-3 last:mb-0 [&:nth-last-child(2)]:mb-0 transition-opacity'
			}
			onClick={clickEvent}
		>
			<img src={icon} alt='auth-icon' />
		</button>
	)
}

export default AuthBttn
