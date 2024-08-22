import { cn } from '@/utils/cn'
import Linkify from 'linkify-react'
import { FC } from 'react'

interface IOrderItem {
  index: number
  order: string
  nickname: string
  time: string
  isPastOrders: boolean
}

const renderLink = ({ attributes }: { attributes: any; content: string }) => {
  const { href, ...props } = attributes

  return (
    <a href={href} {...props}>
      Видео
    </a>
  )
}

const OrderItem: FC<IOrderItem> = ({ index, order, nickname, time, isPastOrders }) => {
  return (
    <div className='flex max-h-[4.3125rem] min-h-[4.3125rem] w-full items-center'>
      <p className='line-clamp-3 w-[15%] break-words px-1 text-center font-pressStart text-[0.9375rem] text-primaryText'>
        {index}
      </p>
      <div className='mx-auto flex h-full w-[85%] flex-col items-center self-start px-4 pt-[1.375rem]'>
        <Linkify options={{ target: '_blank', render: renderLink }}>
          <p
            className={cn(
              'mb-[0.3125rem] max-w-full truncate font-pressStart text-[0.9375rem] leading-4 [&>a]:text-[#8684EB]',
              {
                'text-[#A6A6A6]': isPastOrders,
                'text-primaryText ': !isPastOrders
              }
            )}
          >
            {order}
          </p>
        </Linkify>

        <div className='flex w-full justify-between'>
          <p
            className={cn('mr-4 w-[80%] truncate font-pressStart text-[0.625rem] leading-3', {
              'text-[#9A2855]': isPastOrders,
              'text-primary': !isPastOrders
            })}
          >
            {nickname}
          </p>
          <p
            className={cn('w-[20%] truncate text-right font-pressStart text-[0.625rem] leading-3', {
              'text-[#A6A6A6]': isPastOrders,
              'text-[#EBE984]': !isPastOrders
            })}
          >
            {time === '' ? 'Тип Х' : time}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
