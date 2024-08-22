import { RoomAppearanceContext } from '@/Context'
import { useBuyBadge } from '@/api/useBuyBadge'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'
import { IBadge } from '@/types/badge.interface'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
import { FC, useContext, useEffect, useState } from 'react'

interface IBadgesBuy {
  activeBadge: IBadge | null
  buyedBadges: IBadge[]
}

const BadgesBuy: FC<IBadgesBuy> = ({ activeBadge, buyedBadges }) => {
  const [isBadgeBuyed, setIsBadgeBuyed] = useState(false)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate: buyBadge, isSuccess, error } = useBuyBadge()

  const handleClickBuy = () => {
    if (activeBadge) {
      buyBadge(activeBadge.id)
    }
  }

  const checkIsBgBuyed = () => {
    if (!!buyedBadges.find((b) => b.id === activeBadge?.id)) {
      setIsBadgeBuyed(true)
    } else {
      setIsBadgeBuyed(false)
    }
  }

  useToastOnSuccess(isSuccess, successBuyToast)
  useToastOnError(error, notEnoughDangoToast)

  useEffect(() => {
    checkIsBgBuyed()
  }, [activeBadge])

  useEffect(() => {
    if (isSuccess) {
      setIsBadgeBuyed(true)
    }
  }, [isSuccess])

  return (
    <div className='flex h-11 w-full'>
      <div className='flex h-full w-[35%] min-w-[4.7rem] items-center justify-center rounded-bl-[1.2rem] bg-tertiary'>
        <p className='text-center text-[0.8125rem] leading-[97.795%] text-primaryText'>К оплате:</p>
      </div>
      <div className='flex h-full flex-1 items-center justify-center bg-secondary px-2'>
        <p className='text-center text-[0.9375rem] leading-[97.795%] text-[#EBE984]'>
          {isBadgeBuyed ? 'Куплено' : !!activeBadge ? `${activeBadge?.cost} ДО` : '0 ДО'}
        </p>
      </div>
      <button
        disabled={!activeBadge || isBadgeBuyed}
        onClick={handleClickBuy}
        className={`${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } w-[21.15%] min-w-[3.5rem] rounded-br-[1.2rem] text-xs text-primaryText transition-all hover:text-white disabled:bg-tertiary hover:disabled:text-primaryText`}
      >
        Купить
      </button>
    </div>
  )
}

export default BadgesBuy
