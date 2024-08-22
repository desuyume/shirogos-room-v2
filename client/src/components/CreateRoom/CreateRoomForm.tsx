import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ICreateRoomForm {
  username: string
  roomName: string
  setRoomName: React.Dispatch<React.SetStateAction<string>>
  createRoom: () => void
  logout?: () => Promise<void>
}

const CreateRoomForm: FC<ICreateRoomForm> = ({
  username,
  roomName,
  setRoomName,
  createRoom,
  logout
}) => {
  const navigate = useNavigate()

  const cancel = async () => {
    navigate('/')
    if (logout) await logout()
  }

  return (
    <div className='relative flex h-[calc(100vh-84px)] w-[50.6875rem] flex-col items-center justify-center rounded-[1.5rem] bg-tertiary pb-[7rem] lg:items-start lg:pl-14'>
      <div className='mb-[1.87rem] flex flex-col items-center'>
        <label
          className='mb-2 font-secondary text-[2.1875rem] font-bold leading-[95.5%] tracking-[-0.13125rem] text-primaryText'
          htmlFor='room-name'
        >
          Название комнаты:
        </label>
        <input
          className='mb-[0.31rem] h-[2.75rem] w-[27rem] bg-primaryText text-center font-quaternary text-[2.1875rem] leading-[100%] text-tertiary outline-none'
          id='room-name'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <p className='w-[18.5rem] text-center font-secondary text-[0.9375rem] font-bold leading-[103.5%] tracking-[-0.05625rem] text-primaryText'>
          Так будет называться твоя комната. Можно будет изменить.
        </p>
      </div>
      <div className='mb-[4.51rem] flex flex-col items-center'>
        <label
          className='mb-2 font-secondary text-[2.1875rem] font-bold leading-[95.5%] tracking-[-0.13125rem] text-primaryText'
          htmlFor='nickname'
        >
          Никнейм:
        </label>
        <input
          value={username}
          className='mb-[0.31rem] h-[2.75rem] w-[27rem] bg-primaryText text-center font-quaternary text-[2.1875rem] leading-[100%] text-tertiary outline-none'
          id='nickname'
          disabled
        />
      </div>
      <button
        onClick={createRoom}
        className='ml-7 flex h-[5rem] w-[23.5rem] items-center justify-center bg-primary font-secondary text-[2.1875rem] font-bold tracking-[-0.13125rem] text-primaryText transition-all hover:bg-primaryHover hover:text-white'
      >
        Принять
      </button>
      <button
        onClick={cancel}
        className='absolute bottom-6 left-14 h-[5rem] w-[12.3125rem] rounded-[1.5625rem] bg-secondaryHover font-secondary text-[1.875rem] font-bold tracking-[-0.1125rem] text-primaryText transition-all hover:bg-secondary hover:text-white'
      >
        Отмена
      </button>
    </div>
  )
}

export default CreateRoomForm
