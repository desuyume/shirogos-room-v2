import { FC } from 'react'
import OrdersList from './OrdersList'
import AddOrder from './AddOrder'
import { usePendingOrders } from '@/api/usePendingOrders'

const OrdersContent: FC = () => {
  const { data: orders, isLoading, isError } = usePendingOrders()

  return (
    <div className='orders-admin w-[60%]'>
      <div className='flex h-[2.9375rem] w-[76.2%] bg-tertiary [&>p]:flex [&>p]:h-full [&>p]:items-center [&>p]:justify-center [&>p]:text-center [&>p]:font-secondary [&>p]:text-xl [&>p]:font-bold [&>p]:text-[#FFF]'>
        <p className='w-[6.59%]'>#</p>
        <p className='w-[25%]'>Никнейм</p>
        <p className='flex-1'>Заказ</p>
        <p className='w-[20%]'>На сколько</p>
      </div>
      {isLoading ? (
        <div className='flex h-[27.5rem] w-[76.2%] items-center justify-center'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[27.5rem] w-[76.2%] items-center justify-center'>
          <p>Ошибка</p>
        </div>
      ) : (
        <>
          <OrdersList orders={orders} />
          <AddOrder index={orders.length + 1} />
        </>
      )}
    </div>
  )
}

export default OrdersContent
