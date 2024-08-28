import { FC, useState } from 'react'
import olenyashaImg from '@/assets/room/olenyasha-order.png'
import olenyashaHoverImg from '@/assets/room/olenyasha-order-hover.png'
import { cn } from '@/utils/cn'

interface IOrderRules {
  type: string
  isRulesOpened: boolean
  setIsRulesOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderRules: FC<IOrderRules> = ({ type, isRulesOpened, setIsRulesOpened }) => {
  const [isRulesHover, setIsRulesHover] = useState<boolean>(false)

  const mouseEnterHandler = () => {
    if (isRulesOpened) {
      setIsRulesHover(false)
    } else {
      setIsRulesHover(true)
    }
  }

  const mouseLeaveHandler = () => {
    if (isRulesOpened) {
      setIsRulesHover(true)
    } else {
      setIsRulesHover(false)
    }
  }

  return (
    <div className='z-20 flex w-[23.28%] flex-col justify-end items-center transition-all'>
      <div className='aspect-[216/218] w-full max-w-[13.5rem] relative'>
        <img
          src={olenyashaImg}
          alt='olenyasha-img'
          className={cn('w-full h-full absolute inset-0 visible opacity-100', {
            'invisible opacity-0': isRulesHover
          })}
        />
        <img
          src={olenyashaHoverImg}
          alt='olenyasha-img'
          className={cn('w-full h-full -translate-x-[0.9375rem] absolute inset-0 invisible opacity-0', {
            'visible opacity-100': isRulesHover
          })}
        />
      </div>

      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={() => setIsRulesOpened(!isRulesOpened)}
        className='group flex h-[6.22319rem] w-full cursor-pointer items-center justify-center rounded-[1.5625rem] bg-tertiary bg-opacity-50 transition-all hover:bg-secondaryHover px-1'
      >
        <p className='w-[11.25rem] text-center text-xl leading-[97.795%] text-primaryText transition-all group-hover:text-white'>
          {type === 'game' ? 'Правила заказа игр' : 'Правила заказа просмотра'}
        </p>
      </div>
    </div>
  )
}

export default OrderRules
