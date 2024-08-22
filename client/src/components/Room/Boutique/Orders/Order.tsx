import { FC } from 'react'
import OrderInput from './OrderInput'
import Price from './Price'
import { useOrdersByType } from '@/api/useOrdersByType'
import { IMakeOrder } from '@/types/room.interface'

interface OrderProps {
  finalPrice: number
  setFinalPrice: React.Dispatch<React.SetStateAction<number>>
  isOrdered: boolean
  clickBuy: () => void
  type: string
  userOrder: IMakeOrder | null
  setUserOrder: React.Dispatch<React.SetStateAction<IMakeOrder | null>>
}

const Order: FC<OrderProps> = ({
  finalPrice,
  setFinalPrice,
  isOrdered,
  clickBuy,
  type,
  userOrder,
  setUserOrder
}) => {
  const { data: ordersInfo, isLoading, isError } = useOrdersByType(type)

  return (
    <div className='flex flex-1 flex-col items-center justify-between pt-[0.69rem] transition-all'>
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-xl text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-xl text-primaryText'>Ошибка</p>
        </div>
      ) : (
        <>
          <h2 className='text-[2.1875rem] leading-[97.795%] text-primaryText'>
            {type === 'game' ? 'Заказ игры' : 'Заказ просмотра'}
          </h2>
          <div className='w-[78.9%]'>
            {ordersInfo?.map((order) => (
              <OrderInput
                key={order.id}
                isOrdered={isOrdered}
                time={order.text}
                orderPrice={order.cost}
                orderPriceId={order.priceId}
                setFinalPrice={setFinalPrice}
                userOrder={userOrder}
                setUserOrder={setUserOrder}
              />
            ))}
          </div>
          <Price clickBuy={clickBuy} finalPrice={finalPrice} isDisabled={!userOrder} />
        </>
      )}
    </div>
  )
}

export default Order
