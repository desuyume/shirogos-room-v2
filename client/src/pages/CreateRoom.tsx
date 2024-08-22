import { FC, useContext, useEffect, useState } from 'react'
import CreateRoomHeader from '@/components/CreateRoom/CreateRoomHeader'
import CreateRoomForm from '@/components/CreateRoom/CreateRoomForm'
import shirogoImg from '@/assets/create-room-img.png'
import { useCreateRoom } from '@/api/useCreateRoom'
import { UserContext } from '@/Context'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { roomNameLengthToast, usernameLengthToast } from '@/utils/toasts'

const CreateRoom: FC = () => {
  const userContext = useContext(UserContext)
  const [roomName, setRoomName] = useState<string>('')
  const navigate = useNavigate()

  const { mutate, isSuccess } = useCreateRoom()

  const createRoom = () => {
    if (roomName.length < 3 || roomName.length > 34) {
      roomNameLengthToast()
      return
    }

    if (!userContext?.user?.twitch.displayName) {
      usernameLengthToast()
      return
    }

    mutate({ roomName, username: userContext?.user?.twitch.displayName })
  }

  useEffect(() => {
    if (userContext?.isRoomCreated) {
      navigate('/room')
    }
  }, [userContext?.isRoomCreated])

  useEffect(() => {
    if (isSuccess) {
      userContext?.setIsRoomCreated(true)
      navigate('/room')
    }
  }, [isSuccess])

  return !userContext?.isFetched || userContext?.isRoomCreated ? (
    <Loader />
  ) : (
    <>
      <CreateRoomHeader />
      <p className='absolute left-[50%] top-[2.62rem] z-20 translate-x-[-50%] text-center font-secondary text-[3.125rem] font-bold leading-[95.5%] tracking-[-0.1875rem] text-primaryText'>
        Привет, <br />
        <span className='text-[2.5rem] tracking-[-0.15rem] text-primary'>
          {userContext?.user?.twitch.displayName}
        </span>
        !
      </p>
      <div className='flex justify-center lg:mr-[3.57rem]'>
        <CreateRoomForm
          username={userContext?.user?.twitch.displayName ?? ''}
          roomName={roomName}
          setRoomName={setRoomName}
          createRoom={createRoom}
          logout={userContext?.logout}
        />
      </div>
      <img
        className='pointer-events-none absolute bottom-0 left-[45%] hidden h-screen lg:block'
        src={shirogoImg}
        alt='shirogo-img'
      />
    </>
  )
}

export default CreateRoom
