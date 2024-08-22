import { FC, useContext, useEffect, useState } from 'react'
import { useUserRoomColors } from '@/api/useUserRoomColors'
import { IRoomColor } from '@/types/room.interface'
import { useBuyRoomColor } from '@/api/useBuyRoomColor'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'

interface IBuyColor {
  type: string
}

const BuyColor: FC<IBuyColor> = ({ type }) => {
  const [cost, setCost] = useState<number>(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [allColors, setAllColors] = useState<IRoomColor[] | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { data: roomColors, isLoading, isError, isSuccess } = useUserRoomColors()
  const { mutate, isSuccess: isBuySucces, error } = useBuyRoomColor(type)

  const checkColor = (color: IRoomColor) => {
    if (type === 'room') {
      return roomColors?.userColors.room_colors.some((obj) => obj === color.name)
    }

    if (type === 'username') {
      return roomColors?.userColors.username_colors.some((obj) => obj === color.name)
    }
  }

  const toggleColor = (color: IRoomColor) => {
    if (selectedColor === color.name) {
      setCost(0)
      setSelectedColor(null)
    } else {
      setCost(color.cost)
      setSelectedColor(color.name)
    }
  }

  const clickBuy = () => {
    const color = roomColors?.roomColors.find((obj) => obj.name === selectedColor)

    if (color) {
      mutate({ roomColorId: color.id, cost })
    }
  }

  useToastOnSuccess(isBuySucces, successBuyToast)
  useToastOnError(error, notEnoughDangoToast)

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        setAllColors(type === 'room' ? roomColors.roomColors : roomColors.usernameColors)
      }
    }
  }, [isLoading])

  useEffect(() => {
    if (isBuySucces) {
      setCost(0)
    }
  }, [isBuySucces])

  return (
    <div
      className={`h-[21.5625rem] w-[48.7%] ${
        colorVariants.bgRoomGradient[roomAppearance.active_room_color]
      } flex flex-col items-center justify-between rounded-[1.5625rem] pt-[0.68rem]`}
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center text-primaryText'>Ошибка</p>
        </div>
      ) : (
        <>
          <div className='flex max-h-[5.6rem] min-h-[5.6rem] min-w-[60%] max-w-[60%] items-center justify-center rounded-[1.5625rem] bg-tertiary'>
            <p className='px-2 text-center text-xl leading-[97.795%] text-primaryText'>
              {type === 'room' ? 'Цветовая тема аккаунта' : 'Цвет никнейма'}
            </p>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-[3%] laptop:h-[40%] min-desktop:h-[44%] medium-desktop:h-[52%] fullhd:h-[57.5%] 2k:h-[30%]'>
            {allColors
              ?.filter((color) => color.name !== 'pink')
              .map((color) => (
                <button
                  key={color.id}
                  style={{ backgroundColor: color.hex }}
                  className={
                    (selectedColor === color.name
                      ? 'scale-[107%] border-2 border-[#F8FEFA] transition-transform '
                      : '') +
                    (checkColor(color) ? 'invisible opacity-0 ' : 'visible opacity-100 ') +
                    'flex aspect-square max-h-[30%] min-h-[30%] cursor-pointer items-center justify-center rounded-[1.125rem] transition-all 2k:max-h-[40%] 2k:min-h-[40%]'
                  }
                  onClick={() => toggleColor(color)}
                />
              ))}
          </div>
        </>
      )}
      <div className='flex min-h-[2.6875rem] w-full'>
        <div className='flex h-full w-[31%] items-center justify-center rounded-bl-[1.2rem] bg-tertiary'>
          <p className='text-center text-[0.8125rem] leading-[97.795%] text-primaryText'>
            К оплате:
          </p>
        </div>
        <div className='flex h-full w-[43.5%] items-center justify-center bg-secondary'>
          <p className='text-center text-[0.9375rem] leading-[97.795%] text-[#EBE984]'>{cost} ДО</p>
        </div>
        <button
          disabled={cost <= 0}
          onClick={clickBuy}
          className={`h-full flex-1 ${colorVariants.bg[roomAppearance.active_room_color]} ${
            colorVariantsHover.bg[roomAppearance.active_room_color]
          } flex items-center justify-center rounded-br-[1.2rem] text-xs text-primaryText transition-all hover:text-white disabled:bg-tertiary hover:disabled:text-primaryText`}
        >
          Купить
        </button>
      </div>
    </div>
  )
}

export default BuyColor
