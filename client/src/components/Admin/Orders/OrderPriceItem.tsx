import { useUpdateOrderPrice } from '@/api/useUpdateOrderPrice'
import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

interface IOrderPriceItem {
  id: number
  cost: number
  time: string
}

const OrderPriceItem: FC<IOrderPriceItem> = ({ id, cost, time }) => {
  const [costValue, setCostValue] = useState<string>(String(cost))
  const [timeValue, setTimeValue] = useState<string>(time)

  const { mutate } = useUpdateOrderPrice(id)

  const onBlurCostHandler = () => {
    if (isNumber(costValue)) {
      setCostValue(costValue)
      updatePrice()
    } else {
      setCostValue(String(cost))
      console.log('cost must be number')
    }
  }

  const updatePrice = () => {
    mutate({ cost: +costValue, text: timeValue })
  }

  return (
    <div className='flex h-[3.25rem] w-full bg-secondary'>
      <input
        value={costValue}
        onChange={(e) => setCostValue(e.target.value)}
        onBlur={onBlurCostHandler}
        className='flex h-full w-[60%] items-center justify-center bg-transparent text-center font-secondary text-xl font-bold text-[#FFF] outline-none'
      />
      <input
        value={timeValue}
        onChange={(e) => setTimeValue(e.target.value)}
        onBlur={updatePrice}
        className='flex h-full w-[40%] items-center justify-center bg-transparent text-center font-secondary text-[0.9375rem] font-bold text-[#FFF] outline-none'
      />
    </div>
  )
}

export default OrderPriceItem
