import { FC, useContext, useState } from 'react'
import shirogoImg from '@/assets/shirogo-first-screen.png'
import Socials from '@/components/Socials/Socials'
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse'
import AuthModal from '@/components/Auth/AuthModal'
import closeImg from '@/assets/auth/close-bttn.gif'
import { UserContext } from '@/Context'
import RoomInfo from '../MainPage/RoomInfo'

const FirstScreen: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const context = useContext(UserContext)

  return (
    <div className='relative h-[45.5625rem] overflow-hidden'>
      <AuthModal visible={isModalVisible} setVisible={setIsModalVisible} />

      <img
        className={
          (isModalVisible ? 'visible opacity-100' : 'invisible opacity-0') +
          ' trab absolute -top-[1.08875rem] left-[50%] z-30 h-[24.616rem] w-[24.616rem] translate-x-[-134%] rotate-[-121.245deg] transition-all'
        }
        src={closeImg}
        alt='close-img'
      />

      <Socials />

      <MouseParallaxContainer
        containerStyle={{ overflow: 'visible' }}
        className='flex h-full w-screen select-none justify-center'
        globalFactorX={0.2}
        globalFactorY={0.2}
        useWindowMouseEvents
      >
        <MouseParallaxChild
          factorX={0.2}
          factorY={0.2}
          className='pointer-events-none absolute top-[-111px] z-10'
        >
          <img src={shirogoImg} />
        </MouseParallaxChild>
      </MouseParallaxContainer>

      {context?.user && context.isRoomCreated ? (
        <div className='absolute right-[3.8125rem] top-2.5 flex flex-col'>
          <RoomInfo />
        </div>
      ) : (
        <div className='absolute right-[1.3125rem] top-3 flex flex-col'>
          <button
            className='z-30 rounded-[37px] bg-primary px-9 py-5 text-4xl text-primaryText transition-colors hover:bg-primaryHover hover:text-white'
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
