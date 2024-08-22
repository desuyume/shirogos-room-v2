import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { useInputLimit } from '@/hooks/useInputLimit'
import { IMakeOrder } from '@/types/room.interface'
import { FC, useContext, useEffect, useState } from 'react'

interface IOrderInput {
  isOrdered: boolean
  time: string
  orderPrice: number
  orderPriceId: number
  setFinalPrice: React.Dispatch<React.SetStateAction<number>>
  userOrder: IMakeOrder | null
  setUserOrder: React.Dispatch<React.SetStateAction<IMakeOrder | null>>
}

const OrderInput: FC<IOrderInput> = ({
  isOrdered,
  time,
  orderPrice,
  orderPriceId,
  setFinalPrice,
  userOrder,
  setUserOrder
}) => {
  const isVideo = orderPriceId === 4 || orderPriceId === 5
  const [description, setDescription] = useState<string>('')
  const [isInputActive, setIsInputActive] = useState<boolean>(false)
  const { limit, setLimit, changeNameHandler, keyDownHandler } = useInputLimit(setDescription)
  const roomAppearance = useContext(RoomAppearanceContext)

  const clickChooseBttn = () => {
    if (isInputActive) {
      setFinalPrice(0)
      setUserOrder(null)
    } else {
      setFinalPrice(orderPrice)
      setUserOrder({ orderText: description, orderPriceId: orderPriceId })
    }
    setIsInputActive(!isInputActive)
  }

  useEffect(() => {
    if (!isOrdered) {
      setIsInputActive(false)
      setDescription('')
      setLimit(34)
    }
  }, [isOrdered])

  useEffect(() => {
    if (userOrder && userOrder?.orderPriceId !== orderPriceId) {
      setIsInputActive(false)
    }
  }, [userOrder])

  useEffect(() => {
    if (userOrder) {
      const updatedOrder = {
        orderText: description,
        orderPriceId: orderPriceId
      }
      setUserOrder(updatedOrder)
    }
  }, [description])

  return (
    <div
      className={
        (isInputActive ? 'border-[1px] border-primaryText ' : '') +
        'mb-[0.41rem] flex h-[2.8rem] w-full last-of-type:mb-0'
      }
    >
      <div className='flex h-full w-[21%] items-center justify-center bg-tertiary bg-opacity-50'>
        <p className='text-center text-[0.9375rem] text-primaryText'>{time}</p>
      </div>
      <div className='relative flex h-full flex-1 items-center'>
        <input
          value={description}
          onChange={(e) => (!!isVideo ? setDescription(e.target.value) : changeNameHandler(e))}
          onKeyDown={(e) => !isVideo && keyDownHandler(e)}
          disabled={!isInputActive}
          className='h-full w-full bg-tertiary text-center text-[0.9375rem] text-primaryText outline-none placeholder:text-primaryText placeholder:text-opacity-25'
          placeholder={isVideo ? 'Не забудь ссылку' : 'Не забудь описание'}
        />
        {!isVideo && (
          <p
            className={
              (isInputActive ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
              `absolute right-[0.44rem] ${
                colorVariants.text[roomAppearance.active_room_color]
              } pointer-events-none z-10 text-[0.625rem] transition-all`
            }
          >
            {limit}
          </p>
        )}
      </div>

      <button
        onClick={clickChooseBttn}
        className={
          (isInputActive
            ? 'w-[22.19%] bg-secondary text-[0.9375rem] hover:bg-secondaryHover '
            : `w-[15.9%] ${colorVariants.bg[roomAppearance.active_room_color]} ${
                colorVariantsHover.bg[roomAppearance.active_room_color]
              } text-xs `) + 'h-full text-primaryText transition-all hover:text-white'
        }
      >
        {isInputActive ? 'Отмена' : 'Выбрать'}
      </button>
    </div>
  )
}

export default OrderInput
