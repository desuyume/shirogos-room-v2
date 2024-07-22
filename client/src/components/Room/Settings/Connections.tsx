import { FC } from 'react'
import discordIcon from '@/assets/room/discord.png'
import telegramIcon from '@/assets/room/telegram.png'
import twitchIcon from '@/assets/room/twitch.png'
import vkIcon from '@/assets/room/vk.png'
import { IConnection } from '@/types/user.interface'
import Connection from './Connection'

interface IConnections {
	discord: IConnection
	telegram: IConnection
	twitch: IConnection
	vk: IConnection
}

const Connections: FC<IConnections> = ({ discord, telegram, twitch, vk }) => {
	return (
		<div className='h-[13.25rem] flex flex-col items-center justify-center'>
			<h3 className='text-[#FFF] text-[1.875rem] leading-[97.795%] mb-[1.69rem]'>
				Подключения
			</h3>
			<div className='flex w-full'>
				<div className='flex flex-col items-center mx-auto w-full'>
					<Connection
						service='Discord'
						connectionData={discord}
						icon={discordIcon}
						isDisabled
					/>
					<Connection
						service='Twitch'
						connectionData={twitch}
						icon={twitchIcon}
					/>
				</div>
				<div className='flex flex-col w-full ml-10'>
					<Connection
						service='Telegram'
						connectionData={telegram}
						icon={telegramIcon}
						isDisabled
					/>
					<Connection
						service='Vk'
						connectionData={vk}
						icon={vkIcon}
						isDisabled
					/>
				</div>
			</div>
		</div>
	)
}

export default Connections
