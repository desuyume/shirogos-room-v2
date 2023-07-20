import { FC } from 'react';
import discordIcon from '../assets/auth/discord.png'
import twitchIcon from '../assets/auth/twitch.png'
import vkIcon from '../assets/auth/vk.png'
import tgIcon from '../assets/auth/telegram.png'
import AuthBttn from './AuthBttn'

interface IAuthModal { 
	visible: boolean,
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthModal: FC<IAuthModal> = ({ visible, setVisible }) => {
	const clickAuthDiscord = () => {
		console.log('click auth discord');
	}

	const clickAuthTwitch = () => {
		console.log('click auth twitch');
	}

	const clickAuthVk = () => {
		console.log('click auth vk');
	}

	const clickAuthTg = () => {
		console.log('click auth telegram');
	}

	const authBttns = [
		{ icon: discordIcon, clickEvent: clickAuthDiscord },
		{ icon: twitchIcon, clickEvent: clickAuthTwitch },
		{ icon: vkIcon, clickEvent: clickAuthVk },
		{ icon: tgIcon, clickEvent: clickAuthTg },
	]

	const closeModal = () => {
		setVisible(false)
		document.body.style.overflowY = 'auto'
	}

	return (
		<div
			className={'bg-secondary bg-opacity-25 w-full h-full flex justify-center items-center fixed z-50 transition-all ' + (visible ? 'visible opacity-100' : 'invisible opacity-0') }
			onClick={closeModal}
		>
			<div
				onClick={e => e.stopPropagation()} 
				className='bg-secondary text-center pt-10 pb-12 px-14 rounded-[37px]'
			>
				<p className='text-[3.75rem] text-[#FFFFFF] font-bold font-secondary leading-none'>Вход</p>
				<p className='text-[2.1875rem] font-bold font-secondary leading-none mb-8'><span className='text-[#FFFFFF]'>в</span> комнату:</p>
				<div className='flex justify-between items-center flex-wrap max-w-[230px]'>
					{authBttns.map(bttn => 
						<AuthBttn key={bttn.icon} icon={bttn.icon} clickEvent={bttn.clickEvent} />	
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthModal;