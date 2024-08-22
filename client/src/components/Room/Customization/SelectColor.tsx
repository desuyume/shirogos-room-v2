import { FC, useContext, useEffect, useState } from 'react'
import lockImg from '@/assets/room/lock.png'
import { Scrollbar } from 'react-scrollbars-custom'
import { useUserRoomColors } from '@/api/useUserRoomColors'
import { IRoomColor } from '@/types/room.interface'
import { useChangeRoomColor } from '@/api/useChangeRoomColor'
import { useChangeUsernameColor } from '@/api/useChangeUsernameColor'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

interface ISelectColor {
  type: string
  title: string
  className?: string
}

const SelectColor: FC<ISelectColor> = ({ type, title, className }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { isLoading, isError, data: roomColors } = useUserRoomColors()
  const { mutate: mutateRoomColor } = useChangeRoomColor()
  const { mutate: mutateUsernameColor } = useChangeUsernameColor()

  const checkColor = (color: IRoomColor) => {
    if (type === 'room') {
      return roomColors?.userColors.room_colors.some((obj) => obj === color.name)
    } else {
      return roomColors?.userColors.username_colors.some((obj) => obj === color.name)
    }
  }

  const chooseColor = (color: IRoomColor) => {
    if (checkColor(color)) {
      setSelectedColor(color.name)
      if (type === 'room') {
        mutateRoomColor({ color: color.name })
      } else {
        mutateUsernameColor({ color: color.name })
      }
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        setSelectedColor(
          type === 'room'
            ? roomColors.userColors.active_room_color
            : roomColors.userColors.active_username_color
        )
      }
    }
  }, [isLoading])

  return (
    <div
      className={`w-full ${
        colorVariants.bgRoomGradient[roomAppearance.active_room_color]
      } select-color flex h-[6.625rem] rounded-[1.5625rem] px-[0.56rem] py-[0.56rem] transition-all ${className}`}
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-[0.9375rem] leading-[97.795%] text-primaryText'>
            Загрузка...
          </p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-[0.9375rem] leading-[97.795%] text-primaryText'>Ошибка</p>
        </div>
      ) : (
        <>
          <div className='mr-[1.2rem] flex h-full w-[10.1875rem] items-center justify-center rounded-[1.0625rem] bg-tertiary'>
            <p
              className={
                (type === 'room' ? 'w-[60%]' : 'w-full') +
                ' text-center text-[0.9375rem] leading-[97.795%] text-primaryText'
              }
            >
              {title}
            </p>
          </div>
          <Scrollbar noDefaultStyles className='flex flex-1 items-center'>
            <div className='flex items-center pl-1'>
              {roomColors.roomColors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => chooseColor(color)}
                  style={{ backgroundColor: color.hex }}
                  className={
                    (selectedColor === color.name ? 'scale-105 border-2 border-[#F8FEFA] ' : '') +
                    (checkColor(color) ? 'cursor-pointer ' : 'cursor-not-allowed ') +
                    `mr-[0.56rem] flex h-[3.25rem] min-w-[3.6875rem] max-w-[3.6875rem] items-center justify-center rounded-[1.125rem] last-of-type:mr-0`
                  }
                >
                  {!checkColor(color) && (
                    <img className='w-[2.4375rem]' src={lockImg} alt='lock-icon' />
                  )}
                </div>
              ))}
            </div>
          </Scrollbar>
        </>
      )}
    </div>
  )
}

export default SelectColor
