import { FC, useState } from 'react'
import docsIcon from '../assets/docs.png'
import docsIconHover from '../assets/docs-hover.png'
import shirogoImg from '../assets/shirogo-first-screen.png'
import Socials from '../components/Socials'
import {
	MouseParallaxChild,
	MouseParallaxContainer,
} from 'react-parallax-mouse'
import AuthModal from './AuthModal'
import closeImg from '../assets/auth/close-bttn.gif'

const FirstScreen: FC = () => {
	const [isDocsHover, setIsDocsHover] = useState<boolean>(false)
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	return (
		<div className='bg-primaryText h-[729px] relative overflow-hidden'>
			<AuthModal visible={isModalVisible} setVisible={setIsModalVisible} />
			<img className={(isModalVisible ? 'visible opacity-100' : 'invisible opacity-0') + ' w-[24.616rem] h-[24.616rem] absolute -top-[1.08875rem] left-[17.37vw] rotate-[-121.245deg] z-30 transition-all'} src={closeImg} alt='close-img' />
			<Socials />
			<h1 className='font-secondary text-[6.25rem] font-bold leading-[95.5%] absolute top-[159px] left-[50%] tracking-[-0.375rem]'>
				КОМНАТА <br />
				<span className='leading-none text-[8.125rem] tracking-[-0.4875rem]'>
					ШИРОГО
				</span>
			</h1>
			<MouseParallaxContainer
				containerStyle={{ overflow: 'visible' }}
				className='flex justify-center w-screen h-full select-none'
				globalFactorX={0.2}
				globalFactorY={0}
			>
				<MouseParallaxChild
					factorX={0.3}
					factorY={0.3}
					className='absolute top-[-111px] z-10'
				>
					<img src={shirogoImg} />
				</MouseParallaxChild>
			</MouseParallaxContainer>

			<button 
				className='bg-primary px-9 py-5 rounded-[37px] absolute right-5 top-3 text-white text-4xl hover:bg-primaryHover transition-colors z-30'
				onClick={() => setIsModalVisible(true)}
			>
				Вход
			</button>
			<a
				onMouseOver={() => setIsDocsHover(true)}
				onMouseLeave={() => setIsDocsHover(false)}
				href='https://docs.google.com/spreadsheets/d/1Qa0lxGo0qPGpLf2k2HsfinIy6zfg7MYlgWGRsG88Eac/edit?usp=sharing'
				target='_blank'
			>
				<img
					className='absolute right-5 bottom-6 w-[78px]'
					src={isDocsHover ? docsIconHover : docsIcon}
					alt='docs-icon'
				/>
			</a>
		</div>
	)
}

export default FirstScreen
