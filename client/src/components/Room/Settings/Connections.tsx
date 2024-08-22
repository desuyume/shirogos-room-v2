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
    <div className='flex h-[13.25rem] flex-col items-center justify-center'>
      <h3 className='mb-[1.69rem] text-[1.875rem] leading-[97.795%] text-primaryText'>
        Подключения
      </h3>
      <div className='flex w-full'>
        <div className='mx-auto flex w-full flex-col items-center'>
          <Connection service='Discord' connectionData={discord} icon={discordIcon} isDisabled />
          <Connection service='Twitch' connectionData={twitch} icon={twitchIcon} />
        </div>
        <div className='ml-10 flex w-full flex-col'>
          <Connection service='Telegram' connectionData={telegram} icon={telegramIcon} isDisabled />
          <Connection service='Vk' connectionData={vk} icon={vkIcon} isDisabled />
        </div>
      </div>
    </div>
  )
}

export default Connections
