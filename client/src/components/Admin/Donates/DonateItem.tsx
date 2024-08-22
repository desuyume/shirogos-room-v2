import { useDeleteDonate } from '@/api/useDeleteDonate'
import { useUpdateDonateAmount } from '@/api/useUpdateDonateAmount'
import { useUpdateDonateGifts } from '@/api/useUpdateDonateGifts'
import { IDonate } from '@/types/donate.interface'
import { formatMoney } from '@/utils/formatMoney'
import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

const DonateItem: FC<IDonate> = ({ id, username, amount, gifts }) => {
  const { mutate: mutateDonate } = useUpdateDonateAmount(id)
  const { mutate: mutateGifts } = useUpdateDonateGifts(id)
  const { mutate: mutateDelete } = useDeleteDonate(id)

  const [addAmount, setAddAmount] = useState<string>('')
  const [resAmount, setResAmount] = useState<number>(amount ? +amount : 0)
  const [giftsValue, setGiftsValue] = useState<string>(!!gifts ? gifts : '')

  const updateAmountHandler = () => {
    if (!isNumber(addAmount)) {
      console.log('addAmount must be number')
    } else {
      mutateDonate({ id, addAmount })
      setResAmount((prev) => prev + +addAmount)
      setAddAmount('')
    }
  }

  const updateGiftsHandler = () => {
    mutateGifts({ id, gifts: giftsValue })
  }

  const deleteDonateHandler = () => {
    mutateDelete(id)
  }

  return (
    <div className='flex items-center'>
      <div className='mr-[0.8vw] flex h-[3.16rem] w-[11.40625vw] items-center justify-center bg-tertiary'>
        <p className='text-center text-xl text-[#FFF]'>{username}</p>
      </div>
      <div className='mr-[0.8vw] flex h-[3.16rem] w-[7.65625vw] items-center justify-center bg-tertiary'>
        <p className='text-center text-xl text-[#FFF]'>{formatMoney(resAmount)}р</p>
      </div>
      <div className='mr-[0.7vw] flex h-[3.16rem] w-[7.65625vw] items-center justify-center bg-tertiary'>
        <input
          value={addAmount}
          onChange={(e) => setAddAmount(e.target.value)}
          className='h-full w-full bg-tertiary text-center text-xl text-[#FFF] outline-none'
        />
      </div>
      <button
        onClick={updateAmountHandler}
        className='mr-[0.7vw] h-[2.5rem] min-w-[5.1vw] max-w-[5.1vw] bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Добавить
      </button>
      <div className='mr-[0.7vw] flex h-[3.16rem] w-[37.03125vw] items-center justify-center bg-tertiary'>
        <input
          value={giftsValue}
          onChange={(e) => setGiftsValue(e.target.value)}
          onBlur={updateGiftsHandler}
          className='h-full w-full bg-tertiary text-center text-xl text-[#FFF] outline-none'
        />
      </div>
      <button
        onClick={deleteDonateHandler}
        className='h-[2.5rem] min-w-[5.1vw] max-w-[5.1vw] bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-secondary'
      >
        Удалить
      </button>
    </div>
  )
}

export default DonateItem
