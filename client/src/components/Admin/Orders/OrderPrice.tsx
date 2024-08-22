import { FC } from 'react'
import OrderPriceList from './OrderPriceList'
import OrderPriceRules from './OrderPriceRules'
import { useOrdersByType } from '@/api/useOrdersByType'

interface IOrderPrice {
  type: string
}

const OrderPrice: FC<IOrderPrice> = ({ type }) => {
  const { data: orderPrices, isLoading, isError } = useOrdersByType(type)

  return (
    <div className='mb-[3.06rem] w-full last-of-type:mb-0'>
      {isLoading ? (
        <div className='flex h-[16.25rem] w-full items-center justify-center bg-tertiary'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[16.25rem] w-full items-center justify-center bg-tertiary'>
          <p>Ошибка</p>
        </div>
      ) : (
        <>
          <div className='flex h-[2.9375rem] w-full bg-tertiary'>
            <p className='flex h-full w-[60%] items-center justify-center text-center font-secondary text-xl font-bold text-[#FFF]'>
              Прайс заказа {type === 'game' ? 'игры' : 'просмотра'}
            </p>
            <p className='flex h-full w-[40%] items-center justify-center text-center font-secondary text-xl font-bold text-[#FFF]'>
              Текст
            </p>
          </div>
          <OrderPriceList prices={orderPrices} />
          <OrderPriceRules type={type} />
        </>
      )}
    </div>
  )
}

export default OrderPrice
