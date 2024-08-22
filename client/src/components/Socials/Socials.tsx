import { FC } from 'react'
import discordIcon from '@/assets/socials/discord.png'
import instagramIcon from '@/assets/socials/instagram.png'
import telegramIcon from '@/assets/socials/telegram.png'
import tiktokIcon from '@/assets/socials/tik-tok.png'
import twitchIcon from '@/assets/socials/twitch.png'
import vkplayIcon from '@/assets/socials/vk-play.png'
import vkIcon from '@/assets/socials/vk.png'
import youtubeIcon from '@/assets/socials/youtube.png'
import SocialItem from './SocialItem'

const Socials: FC = () => {
  const socials = [
    { isPageLink: false, link: 'https://t.me/shironel', icon: telegramIcon },
    { isPageLink: false, link: 'https://vk.com/godofdango', icon: vkIcon },
    { isPageLink: true, link: '/youtubes', icon: youtubeIcon },
    { isPageLink: false, link: 'https://www.instagram.com/evgendango/', icon: instagramIcon },
    { isPageLink: false, link: 'https://www.tiktok.com/@evgendango', icon: tiktokIcon },
    { isPageLink: false, link: 'https://discord.gg/4Ha6EchcaP', icon: discordIcon },
    { isPageLink: false, link: 'https://www.twitch.tv/godofdango', icon: twitchIcon },
    { isPageLink: false, link: 'https://vkplay.live/godofdango', icon: vkplayIcon }
  ]

  return (
    <div className='absolute z-20 flex h-full translate-x-[-50%] flex-col justify-center [&>a:hover]:translate-x-[23px] [&>a:hover]:transition-transform [&>a:last-child]:mb-0 [&>a]:mb-[24px]'>
      {socials.map((social) => (
        <SocialItem
          key={social.link}
          isPageLink={social.isPageLink}
          icon={social.icon}
          link={social.link}
        />
      ))}
    </div>
  )
}

export default Socials
