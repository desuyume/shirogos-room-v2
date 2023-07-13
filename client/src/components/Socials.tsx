import { FC } from 'react'
import discordIcon from '../assets/socials/discord.png'
import instagramIcon from '../assets/socials/instagram.png'
import telegramIcon from '../assets/socials/telegram.png'
import tiktokIcon from '../assets/socials/tik-tok.png'
import twitchIcon from '../assets/socials/twitch.png'
import vkplayIcon from '../assets/socials/vk-play.png'
import vkIcon from '../assets/socials/vk.png'
import youtubeIcon from '../assets/socials/youtube.png'
import { Link } from 'react-router-dom'

const Socials: FC = () => {
	return (
		<div className='flex flex-col justify-center h-full absolute translate-x-[-50%] [&>a]:mb-[3.3vh] [&>a:last-child]:mb-0 [&>a:hover]:translate-x-[1.2vw] [&>a:hover]:transition-transform'>
			<a href='https://t.me/shironel' target='_blank'><img className='h-[7.8vh]' src={telegramIcon} alt='telegram-icon' /></a>
			<a href='https://vk.com/godofdango' target='_blank'><img className='h-[7.8vh]' src={vkIcon} alt='vk-icon' /></a>
			<Link to='/youtubes'><img className='h-[7.8vh]' src={youtubeIcon} alt='youtube-icon' /></Link>
			<a href='https://www.instagram.com/evgendango/' target='_blank'><img className='h-[7.8vh]' src={instagramIcon} alt='telegram-icon' /></a>
			<a href='https://www.tiktok.com/@evgendango' target='_blank'><img className='h-[7.8vh]' src={tiktokIcon} alt='telegram-icon' /></a>
			<a href='https://discord.gg/4Ha6EchcaP' target='_blank'><img className='h-[7.8vh]' src={discordIcon} alt='telegram-icon' /></a>
			<a href='https://www.twitch.tv/godofdango' target='_blank'><img className='h-[7.8vh]' src={twitchIcon} alt='telegram-icon' /></a>
			<a href='https://vkplay.live/godofdango' target='_blank'><img className='h-[7.8vh]' src={vkplayIcon} alt='telegram-icon' /></a>
		</div>
	)
}

export default Socials
