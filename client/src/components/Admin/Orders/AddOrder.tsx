import { useInputLimit } from '@/hooks/useInputLimit'
import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import { useOrderPrices } from '@/api/useOrderPrices'
import { isUrl } from '@/utils/isUrl'
import { useCreateOrderManually } from '@/api/useCreateOrderManually'
import { IFindUser } from '@/types/user.interface'

interface IAddOrder {
  index: number
}

const AddOrder: FC<IAddOrder> = ({ index }) => {
  const [orderText, setOrderText] = useState<string>('')
  const [selecetedTime, setSelecetedTime] = useState<number | null>(null)
  const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
  const { limit, setLimit, changeNameHandler, keyDownHandler } = useInputLimit(setOrderText)
  const [selectedUsers, setSelectedUsers] = useState<IFindUser[]>([])
  const [isVideo, setIsVideo] = useState<boolean>(false)

  const { data: prices, isLoading, isError } = useOrderPrices()
  const { mutate: createOrder, isSuccess } = useCreateOrderManually()

  const clickAddOrder = () => {
    if (!isVideo && (orderText.length > 34 || orderText.length < 3)) {
      console.log('length must be between 3 and 34')
      return
    }

    if (!!isVideo && !isUrl(orderText)) {
      console.log('video must be a url')
      return
    }

    if (!selectedUsers.length) {
      console.log('you must choose at least one user')
      return
    }

    if (!selecetedTime) {
      console.log('you must choose at least one price')
      return
    }

    createOrder({
      orderPriceId: selecetedTime,
      orderText,
      userId: selectedUsers[0].id
    })
  }

  const changePriceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelecetedTime(+e.target.value)

    if (isVideo && orderText.length > 34) {
      setOrderText(orderText.slice(0, 34))
      setLimit(0)
    }

    if (+e.target.value === 4 || +e.target.value === 5) {
      setIsVideo(true)
    } else {
      setIsVideo(false)
    }
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      setSelecetedTime(prices[0].id)
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      setOrderText('')
      setSelectedUsers([])
      setLimit(34)
    }
  }, [isSuccess])

  return (
    <div className='flex h-[3.25rem] w-full items-center justify-between'>
      <div className='flex h-full w-[76.2%] bg-tertiary [&>*]:flex [&>*]:h-full [&>*]:items-center [&>*]:justify-center [&>*]:text-center [&>*]:font-secondary [&>*]:text-xl [&>*]:font-bold [&>*]:text-[#FFF]'>
        <p className='w-[6.59%]'>{index}</p>
        <div className='relative h-full w-[25%]'>
          <button
            onClick={() => setIsChooseUserVisible(!isChooseUserVisible)}
            className='h-full w-full overflow-hidden transition-all hover:bg-secondary'
          >
            {selectedUsers.length > 0 ? selectedUsers[0].userDisplayName : 'выбрать никнейм'}
          </button>
          <FindUser
            isVisible={isChooseUserVisible}
            className='absolute -bottom-[0.42rem] translate-y-[100%]'
            selectType='users'
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
        <div className='relative flex flex-1 items-center'>
          <input
            value={orderText}
            onChange={(e) => (!!isVideo ? setOrderText(e.target.value) : changeNameHandler(e))}
            onKeyDown={(e) => !isVideo && keyDownHandler(e)}
            className='w-full bg-transparent text-center outline-none'
          />
          {!isVideo && (
            <p className='pointer-events-none absolute right-[0.44rem] z-10 text-sm text-primary transition-all'>
              {limit}
            </p>
          )}
        </div>
        {isLoading ? (
          <p className='h-full w-[20%] bg-transparent'>Загрузка...</p>
        ) : isError ? (
          <p className='h-full w-[20%] bg-transparent'>Ошибка</p>
        ) : (
          <select
            defaultValue={prices[0].id}
            onChange={(e) => changePriceHandler(e)}
            className='w-[20%] cursor-pointer bg-transparent outline-none transition-all hover:bg-secondary'
          >
            {prices.map((price) => (
              <option key={price.id} value={price.id}>
                {price.text}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        onClick={clickAddOrder}
        className='h-full w-[11.5%] bg-primary text-xl text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Добавить
      </button>
      <div className='h-full w-[11.5%] bg-transparent' />
    </div>
  )
}

export default AddOrder
