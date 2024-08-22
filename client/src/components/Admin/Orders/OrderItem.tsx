import { useCompleteOrder } from '@/api/useCompleteOrder'
import { useRejectOrder } from '@/api/useRejectOrder'
import Linkify from 'linkify-react'
import { FC } from 'react'

const renderLink = ({ attributes }: { attributes: any; content: string }) => {
  const { href, ...props } = attributes

  return (
    <a href={href} {...props}>
      Видео
    </a>
  )
}

interface IOrderItem {
  index: number
  id: number
  nickname: string
  order: string
  time: string
}

const OrderItem: FC<IOrderItem> = ({ index, id, nickname, order, time }) => {
  const { mutate: completeOrder } = useCompleteOrder()
  const { mutate: rejectOrder } = useRejectOrder()

  const acceptOrder = () => {
    completeOrder(id)
  }

  const cancelOrder = () => {
    rejectOrder(id)
  }

  return (
    <div className='mb-[0.44rem] flex h-[3.125rem] w-full items-center justify-between last-of-type:mb-0'>
      <div className='flex h-full w-[76.2%] bg-secondary [&>p]:flex [&>p]:h-full [&>p]:items-center [&>p]:justify-center [&>p]:text-center [&>p]:font-secondary [&>p]:text-lg [&>p]:font-bold [&>p]:text-[#FFF]'>
        <p className='min-w-[6.59%] max-w-[6.59%]'>{index}</p>
        <p className='min-w-[25%] max-w-[25%]'>{nickname}</p>
        <Linkify options={{ target: '_blank', render: renderLink }}>
          <p className='flex-1 [&>a]:text-[#8684EB]'>{order}</p>
        </Linkify>
        <p className='min-w-[20%] max-w-[20%]'>{time}</p>
      </div>
      <button
        onClick={acceptOrder}
        className='h-full w-[11.5%] bg-primary text-xl text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Готово
      </button>
      <button
        onClick={cancelOrder}
        className='h-full w-[11.5%] bg-tertiary text-xl text-[#FFF] transition-all hover:bg-opacity-80'
      >
        Отмена
      </button>
    </div>
  )
}

export default OrderItem
