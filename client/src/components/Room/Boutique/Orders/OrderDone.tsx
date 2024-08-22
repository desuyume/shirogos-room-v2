import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { IMakeOrder } from '@/types/room.interface'
import { FC, useContext, useEffect, useState } from 'react'

interface IOrderDone {
  clickDanBttn: () => void
  isOrdered: boolean
  userOrder: IMakeOrder | null
}

const OrderDone: FC<IOrderDone> = ({ clickDanBttn, isOrdered, userOrder }) => {
  const [ordersText, setOrdersText] = useState<string | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  useEffect(() => {
    setOrdersText(userOrder?.orderText ?? '')
  }, [userOrder])

  return (
    <div
      className={
        (isOrdered ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute inset-0 z-30 flex h-full w-full flex-col items-center rounded-[1.5625rem] bg-room-orderDone-bg py-4 transition-all'
      }
    >
      <h2 className='mb-4 text-[3.125rem] leading-[97.795%] text-primaryText'>Заказ сделан!</h2>
      <hr
        className={`w-[65.76%] border-t-[3px] ${
          colorVariants.border[roomAppearance.active_room_color]
        } mb-8`}
      />
      <div className='flex flex-1 items-center justify-center'>
        <p className='mb-8 text-center text-[2.1875rem] leading-[97.795%] text-primaryText'>
          {ordersText}
        </p>
      </div>
      <button
        onClick={clickDanBttn}
        className={`${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } mb-[0.63rem] h-[3.6875rem] w-[12.48%] min-w-[6.25rem] text-[2.1875rem] text-primaryText transition-all hover:text-white`}
      >
        ДАН
      </button>
      <p className='text-center text-[0.9375rem] leading-[97.795%] text-primaryText'>
        Смотри очередь заказов на главной странице.
      </p>
    </div>
  )
}

export default OrderDone
