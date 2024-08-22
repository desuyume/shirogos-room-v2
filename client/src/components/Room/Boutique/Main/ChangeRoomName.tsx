import { RoomAppearanceContext } from '@/Context'
import { useChangeRoomName } from '@/api/useChangeRoomName'
import { colorVariants } from '@/consts/roomColors'
import { useInputLimit } from '@/hooks/useInputLimit'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'
import { notEnoughDangoToast, roomNameLengthToast, successBuyToast } from '@/utils/toasts'
import { FC, useContext, useEffect, useState } from 'react'

const ChangeRoomName: FC = () => {
  const [roomName, setRoomName] = useState<string>('')
  const { limit, setLimit, changeNameHandler, keyDownHandler } = useInputLimit(setRoomName)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate, isSuccess, error } = useChangeRoomName()

  const clickChangeRoomName = () => {
    if (roomName.length < 3 || roomName.length > 34) {
      roomNameLengthToast()
      return
    }

    mutate({ roomName })
  }

  useToastOnSuccess(isSuccess, successBuyToast)
  useToastOnError(error, notEnoughDangoToast)

  useEffect(() => {
    if (isSuccess) {
      setRoomName('')
      setLimit(34)
    }
  }, [isSuccess])

  return (
    <div className='flex h-[5.75rem] w-full items-center justify-center rounded-[1.5625rem] bg-tertiary'>
      <div className='flex h-[87%] w-[93%] items-center rounded-[1.5625rem] border-[1px] border-primaryText'>
        <div className='mt-1 flex h-full w-[80.5%] flex-col items-center justify-center'>
          <p className='mb-1.5 text-center text-xl leading-[97.795%] text-primaryText'>
            Изменить название комнаты
          </p>
          <div className='relative flex w-[80%] items-center'>
            <input
              value={roomName}
              onChange={(e) => changeNameHandler(e)}
              onKeyDown={(e) => keyDownHandler(e)}
              className={`w-full bg-transparent text-center text-[0.9375rem] leading-[97.795%] text-[#FFF] outline-none ${
                colorVariants.border[roomAppearance.active_room_color]
              } border-b-[3px] pb-1 ${colorVariants.caret[roomAppearance.active_room_color]}`}
            />
            <p
              className={`${
                colorVariants.text[roomAppearance.active_room_color]
              } absolute -right-[12%] w-[12%] text-center text-xs`}
            >
              {limit}
            </p>
          </div>
        </div>
        <hr className='h-[86.25%] w-[1px] bg-primaryText' />
        <div className='flex h-full flex-1 items-center justify-center'>
          <button
            onClick={clickChangeRoomName}
            disabled={limit === 34 || limit < 0}
            className='h-full w-full rounded-r-[1.5625rem] px-1 text-center text-[1.5625rem] leading-[97.795%] text-[#EBE984] transition-all hover:bg-secondary disabled:cursor-not-allowed disabled:hover:bg-transparent'
          >
            10 ДО
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeRoomName
