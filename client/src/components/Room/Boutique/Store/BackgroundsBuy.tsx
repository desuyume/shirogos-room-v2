import { RoomAppearanceContext } from '@/Context'
import { useBuyBackground } from '@/api/useBuyBackground'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'
import { IBackground } from '@/types/background.interface'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
import { FC, useContext, useEffect, useState } from 'react'

interface IBackgroundsBuy {
  activeBackground: IBackground | null
  buyedBackgrounds: IBackground[]
}

const BackgroundsBuy: FC<IBackgroundsBuy> = ({ activeBackground, buyedBackgrounds }) => {
  const [isBgBuyed, setIsBgBuyed] = useState(false)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate: buyBg, isSuccess, error } = useBuyBackground()

  const handleBuyBg = () => {
    if (activeBackground) {
      buyBg(activeBackground.id)
    }
  }

  const checkIsBgBuyed = () => {
    if (!!buyedBackgrounds.find((bg) => bg.id === activeBackground?.id)) {
      setIsBgBuyed(true)
    } else {
      setIsBgBuyed(false)
    }
  }

  useToastOnSuccess(isSuccess, successBuyToast)
  useToastOnError(error, notEnoughDangoToast)

  useEffect(() => {
    checkIsBgBuyed()
  }, [activeBackground])

  useEffect(() => {
    if (isSuccess) {
      setIsBgBuyed(true)
    }
  }, [isSuccess])

  return (
    <div className='flex h-[2.6875rem] w-[35.35%] min-w-[19.6875rem]'>
      <div className='flex h-full w-[35%] min-w-[4.7rem] items-center justify-center rounded-bl-[1.2rem] bg-tertiary'>
        <p className='text-center text-[0.8125rem] leading-[97.795%] text-primaryText'>К оплате:</p>
      </div>
      <div className='flex h-full flex-1 items-center justify-center bg-secondary px-2'>
        <p className='text-center text-[0.9375rem] leading-[97.795%] text-[#EBE984]'>
          {isBgBuyed ? 'Куплено' : !!activeBackground ? `${activeBackground?.cost} ДО` : '0 ДО'}
        </p>
      </div>
      <button
        disabled={!activeBackground || isBgBuyed}
        onClick={handleBuyBg}
        className={`${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } w-[21.15%] min-w-[3.5rem] rounded-br-[1.2rem] text-xs text-primaryText transition-all hover:text-white disabled:bg-tertiary hover:disabled:text-primaryText`}
      >
        Купить
      </button>
    </div>
  )
}

export default BackgroundsBuy
