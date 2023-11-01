import { FC } from 'react'
import discordIcon from '@/assets/room/discord.png'
import telegramIcon from '@/assets/room/telegram.png'
import twitchIcon from '@/assets/room/twitch.png'
import vkIcon from '@/assets/room/vk.png'
import { IConnection } from '@/types/user.interface'

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
					<div
						className={
							(discord
								? ''
								: 'cursor-pointer opacity-50 hover:opacity-100 ') +
							'flex items-center cursor-pointer transition-all mb-4'
						}
					>
						<img className='mr-4' src={discordIcon} alt='discord-icon' />
						<p className='text-primaryText text-xl'>
							{discord ? discord.displayName : 'не подключено'}
						</p>
					</div>
					<div
						className={
							(twitch
								? ''
								: 'cursor-pointer opacity-50 hover:opacity-100 ') +
							'flex items-center cursor-pointer transition-all ml-2.5'
						}
					>
						<img className='mr-4' src={twitchIcon} alt='twitch-icon' />
						<p className='text-primaryText text-xl'>
							{twitch ? twitch.displayName : 'не подключено'}
						</p>
					</div>
				</div>
				<div className='flex flex-col w-full ml-10'>
					<div
						className={
							(telegram
								? ''
								: 'cursor-pointer opacity-50 hover:opacity-100 ') +
							'flex items-center cursor-pointer transition-all mb-4'
						}
					>
						<img className='mr-4' src={telegramIcon} alt='telegram-icon' />
						<p className='text-primaryText text-xl'>
							{telegram ? telegram.displayName : 'не подключено'}
						</p>
					</div>
					<div
						className={
							(vk
								? ''
								: 'cursor-pointer opacity-50 hover:opacity-100 ') +
							'flex items-center transition-all'
						}
					>
						<img className='mr-4' src={vkIcon} alt='vk-icon' />
						<p className='text-primaryText text-xl'>
							{vk ? vk.displayName : 'не подключено'}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Connections
