import { FC } from 'react'
import OrderItem from './OrderItem'
import { IUserOrder } from '@/types/order.interface'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel'
import { cn } from '@/utils/cn'

interface IOrdersList {
  isPastOrders: boolean
  orders: IUserOrder[]
}

const OrdersList: FC<IOrdersList> = ({ isPastOrders, orders }) => {
  return (
    <Carousel
      className='bg-secondary bg-opacity-70'
      opts={{
        align: 'start',
        loop: false,
      }}
      orientation='vertical'
    >
      <CarouselContent className='mt-0 h-[12.9375rem]'>
        {orders &&
          orders.map((order, index) => (
            <CarouselItem key={order.id} className='basis-1/3 p-0'>
              <OrderItem
                key={order.id}
                index={index + 1}
                nickname={order.user.username}
                order={order.orderText}
                time={order.orderPrice.text}
                isPastOrders={isPastOrders}
              />
            </CarouselItem>
          ))}
      </CarouselContent>

      <div className='absolute bottom-0 flex h-9 w-full translate-y-full'>
        <CarouselPrevious
          className={cn(
            'static flex h-full w-1/2 translate-x-0 rotate-0 items-center justify-center rounded-none rounded-bl-[2.3125rem] border-none bg-tertiary hover:bg-tertiary hover:opacity-90 disabled:opacity-90 transition-all'
          )}
          children={
            <svg
              width='60'
              height='16'
              viewBox='0 0 60 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M30 0L59.4449 15.75L0.555136 15.75L30 0Z' fill='#D9D9D9' />
            </svg>
          }
        />
        <CarouselNext
          className={cn(
            'static flex h-full w-1/2 translate-x-0 rotate-0 items-center justify-center rounded-none rounded-br-[2.3125rem] border-none bg-tertiary hover:bg-tertiary hover:opacity-90 disabled:opacity-90 transition-all'
          )}
          children={
            <svg
              width='60'
              height='16'
              viewBox='0 0 60 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M30 16L0.555139 0.249998L59.4449 0.250003L30 16Z' fill='#D9D9D9' />
            </svg>
          }
        />
      </div>
    </Carousel>
  )
}

export default OrdersList
