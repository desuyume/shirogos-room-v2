import { FC } from 'react'
import docsIcon from '../assets/docs.png'
import shirogoImg from '../assets/shirogo-first-screen.png'
import Socials from '../components/Socials'

const FirstScreen: FC = () => {
	return (
		<div className='bg-[#DEDEDE] h-screen relative overflow-hidden'>
			<h1 className='absolute font-secondary text-[6.25rem] font-bold leading-[95.5%] tracking-[-0.375rem] left-1/2 top-1/2 translate-y-[-189px]'>
				КОМНАТА <br />
				<span className='leading-none text-[8.125rem] tracking-[-0.4875rem]'>
					ШИРОГО
				</span>
			</h1>
			<img
				src={shirogoImg}
				className='absolute h-full left-1/2 translate-x-[-50%] pointer-events-none'
			/>
			<Socials />
			<button className='bg-primary px-9 py-5 rounded-[37px] absolute right-5 top-3 text-white text-4xl hover:bg-primaryHover transition-colors'>
				Вход
			</button>
			<a
				href='https://docs.google.com/spreadsheets/d/1Qa0lxGo0qPGpLf2k2HsfinIy6zfg7MYlgWGRsG88Eac/edit?usp=sharing'
				target='_blank'
			>
				<img
					className='absolute right-5 bottom-6'
					src={docsIcon}
					alt='docs-icon'
				/>
			</a>
		</div>
	)
}

export default FirstScreen
