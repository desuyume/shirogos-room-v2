import { FC } from 'react'
import discordIcon from '@/assets/auth/discord.png'
import twitchIcon from '@/assets/auth/twitch.png'
import vkIcon from '@/assets/auth/vk.png'
import tgIcon from '@/assets/auth/telegram.png'
import AuthBttn from './AuthBttn'

interface IAuthModal {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type AuthServices = 'Discord' | 'Twitch' | 'Vk' | 'Telegram'

export interface IAuthBttn {
	service: AuthServices
	icon: string
	clickEvent: () => void
	isDisabled?: boolean
}

const AuthModal: FC<IAuthModal> = ({ visible, setVisible }) => {
	const clickAuthDiscord = () => {
		console.log('click auth discord')
	}

	const clickAuthTwitch = () => {
		window.location.href = `${import.meta.env.VITE_API_URL}/auth/twitch`
	}

	const clickAuthVk = () => {
		console.log('click auth vk')
	}

	const clickAuthTg = () => {
		console.log('click auth telegram')
	}

	const authBttns: IAuthBttn[] = [
		{
			service: 'Discord',
			icon: discordIcon,
			clickEvent: clickAuthDiscord,
			isDisabled: true,
		},
		{
			service: 'Twitch',
			icon: twitchIcon,
			clickEvent: clickAuthTwitch,
		},
		{ service: 'Vk', icon: vkIcon, clickEvent: clickAuthVk, isDisabled: true },
		{
			service: 'Telegram',
			icon: tgIcon,
			clickEvent: clickAuthTg,
			isDisabled: true,
		},
	]

	return (
		<div
			className={
				'bg-secondary bg-opacity-50 w-full h-full flex justify-center items-center absolute z-50 transition-all ' +
				(visible ? 'visible opacity-100' : 'invisible opacity-0')
			}
			onClick={() => setVisible(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-secondary text-center pt-16 pb-12 px-[3.6rem] rounded-[37px] bg-opacity-90'
			>
				<p className='text-[3.75rem] text-[#FFFFFF] leading-none'>Вход</p>
				<p className='text-[2.1875rem] font-bold font-secondary leading-none mb-5 -mt-3'>
					<span className='text-[#FFFFFF]'>в</span> комнату:
				</p>
				<div className='flex justify-between items-center flex-wrap max-w-[230px]'>
					{authBttns.map(bttn => (
						<AuthBttn key={bttn.icon} bttn={bttn} />
					))}
				</div>
			</div>
		</div>
	)
}

export default AuthModal
