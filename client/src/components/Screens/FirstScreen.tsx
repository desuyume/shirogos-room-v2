import { FC, useContext, useState } from 'react'
import shirogoImg from '@/assets/shirogo-first-screen.png'
import Socials from '@/components/Socials/Socials'
import {
	MouseParallaxChild,
	MouseParallaxContainer,
} from 'react-parallax-mouse'
import AuthModal from '@/components/Auth/AuthModal'
import closeImg from '@/assets/auth/close-bttn.gif'
import { UserContext } from '@/Context'
import RoomInfo from '../MainPage/RoomInfo'

const FirstScreen: FC = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
	const context = useContext(UserContext)

	return (
		<div className='h-[45.5625rem] relative overflow-hidden'>
			<AuthModal visible={isModalVisible} setVisible={setIsModalVisible} />

			<img
				className={
					(isModalVisible ? 'visible opacity-100' : 'invisible opacity-0') +
					' w-[24.616rem] h-[24.616rem] absolute -top-[1.08875rem] left-[50%] translate-x-[-134%] trab rotate-[-121.245deg] z-30 transition-all'
				}
				src={closeImg}
				alt='close-img'
			/>

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
					className='absolute top-[-111px] z-10 pointer-events-none'
				>
					<img src={shirogoImg} />
				</MouseParallaxChild>
			</MouseParallaxContainer>

			{context?.user ? (
				<div className='flex flex-col absolute right-[3.8125rem] top-2.5'>
					<RoomInfo />
				</div>
			) : (
				<div className='flex flex-col absolute right-[1.3125rem] top-3'>
					<button
						className='bg-primary px-9 py-5 rounded-[37px] text-primaryText hover:text-white text-4xl hover:bg-primaryHover transition-colors z-30'
						onClick={() => setIsModalVisible(true)}
					>
						Вход
					</button>
				</div>
			)}
		</div>
	)
}

export default FirstScreen
