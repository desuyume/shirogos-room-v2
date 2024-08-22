import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { FC, useContext } from 'react'

interface IPrice {
  clickBuy: () => void
  finalPrice: number
  isDisabled: boolean
}

const Price: FC<IPrice> = ({ clickBuy, finalPrice, isDisabled }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <div className='flex h-[3.875rem] w-[78.9%]'>
      <div className='flex h-full w-[24.16%] items-center justify-center rounded-bl-[1.5625rem] bg-tertiary'>
        <p className='text-center text-xl text-primaryText'>К оплате:</p>
      </div>
      <div className='flex h-full flex-1 items-center justify-center bg-secondary'>
        <p className='text-center text-[1.0625rem] text-[#EBE984]'>{finalPrice} ДО</p>
      </div>
      <button
        disabled={isDisabled}
        onClick={clickBuy}
        className={`h-full w-[22.3%] ${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } rounded-br-[1.5625rem] text-[1.0625rem] text-primaryText transition-all hover:text-white disabled:bg-tertiary hover:disabled:text-primaryText`}
      >
        Купить
      </button>
    </div>
  )
}

export default Price
