import { FC, useState } from 'react'
import gamepadImg from '@/assets/gamepad.png'
import OrdersList from './OrdersList'
import { usePendingOrders } from '@/api/usePendingOrders'

interface ICurrentOrders {
  isPastOrders: boolean
  setIsPastOrders: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrentOrders: FC<ICurrentOrders> = ({ isPastOrders, setIsPastOrders }) => {
  const [isHintVisible, setIsHintVisible] = useState<boolean>(false)

  const { isLoading, isError, data: orders } = usePendingOrders()

  return (
    <div
      className={
        (isPastOrders ? 'invisible opacity-0' : 'visible opacity-100') +
        ' absolute inset-0 h-full w-full'
      }
    >
      <div
        className={
          (isHintVisible ? 'visible opacity-100' : 'invisible opacity-0') +
          ' pointer-events-none absolute left-[3rem] top-[-13.0625rem] z-20 flex h-[15.9375rem] w-[15.9375rem] flex-col items-center justify-center bg-orders-hint-bg bg-no-repeat transition-all'
        }
      >
        <p className='max-w-[12.625rem] text-center font-pressStart text-xl leading-[23px] text-primaryText'>
          Заказы делаются
        </p>
        <p className='font-pressStart text-xl leading-[23px] text-[#EBE984]'>
          <span className='text-primaryText'>в</span> Бутике
        </p>{' '}
        <p className='font-pressStart text-[0.625rem] leading-[15px] text-primaryText'>
          (личная комната).
        </p>
      </div>
      <div className='relative flex h-[4.3125rem] items-center justify-center rounded-t-[2.3125rem] bg-tertiary'>
        <img
          onMouseOver={() => setIsHintVisible(true)}
          onMouseLeave={() => setIsHintVisible(false)}
          className='absolute left-[1.125rem] cursor-pointer'
          src={gamepadImg}
          alt='gamepad-img'
        />
        <h3 className='font-pressStart text-xl text-[#EBE984]'>Текущие заказы</h3>
        <svg
          className='absolute right-5 cursor-pointer'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => setIsPastOrders(true)}
        >
          <circle cx='8' cy='8' r='8' fill='#EBE984' />
        </svg>
      </div>
      {isLoading ? (
        <div className='flex h-[15.1875rem] w-full items-center justify-center rounded-b-[2.3125rem] bg-tertiary bg-opacity-70'>
          <p className='font-pressStart text-[#EBE984]'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[15.1875rem] w-full items-center justify-center rounded-b-[2.3125rem] bg-tertiary bg-opacity-70'>
          <p className='font-pressStart text-[#EBE984]'>Ошибка</p>
        </div>
      ) : !orders.length ? (
        <div className='flex h-[15.1875rem] w-full items-center justify-center rounded-b-[2.3125rem] bg-tertiary bg-opacity-70'>
          <p className='font-pressStart text-[#EBE984]'>Нет активных заказов</p>
        </div>
      ) : (
        <OrdersList isPastOrders={isPastOrders} orders={orders} />
      )}
    </div>
  )
}

export default CurrentOrders
