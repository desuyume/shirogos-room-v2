import { DONATES_KEY } from '@/consts/queryKeys'
import { useCreateDonate } from '@/api/useCreateDonate'
import { isNumber } from '@/utils/isNumber'
import { useQueryClient } from '@tanstack/react-query'
import { FC, SyntheticEvent, useEffect, useState } from 'react'

const AddDonater: FC = () => {
  const { mutate, data, isSuccess } = useCreateDonate()
  const queryCluent = useQueryClient()

  const [username, setUsername] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [gifts, setGifts] = useState<string>('')

  const addDonater = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!isNumber(amount)) {
      console.log('amount must be number')
    } else if (username === '') {
      console.log('username field can not be blank')
    } else {
      const donate = {
        username,
        amount: +amount,
        gifts
      }
      mutate(donate)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      queryCluent.invalidateQueries([DONATES_KEY])
      setUsername('')
      setAmount('')
      setGifts('')
    }
  }, [data])

  return (
    <form className='ml-4 flex h-[3.125rem] pb-[0.87rem]'>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Ник'
        className='mr-[0.8vw] h-full w-[11.40625vw] bg-tertiary text-center text-xl text-[#FFF] outline-none'
        required
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Сумма'
        className='mr-[6.5vw] h-full w-[16.1125vw] bg-tertiary text-center text-xl text-[#FFF] outline-none'
        required
      />
      <input
        value={gifts}
        onChange={(e) => setGifts(e.target.value)}
        placeholder='Комментарий'
        className='mr-[0.78125vw] h-full w-[37.03125vw] bg-tertiary text-center text-xl text-[#FFF] outline-none'
      />
      <button
        onClick={(e) => addDonater(e)}
        className='h-full w-[13.59375vw] bg-primary text-xl text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Добавить
      </button>
    </form>
  )
}

export default AddDonater
