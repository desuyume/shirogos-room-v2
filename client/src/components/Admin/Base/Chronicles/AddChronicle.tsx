import { useCreateChronicle } from '@/api/useCreateChronicle'
import { chronicleMonths } from '@/consts/months'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'

const AddChronicle: FC = () => {
  const { mutate, isSuccess } = useCreateChronicle()
  const [date, setDate] = useState<string>('')

  const clickAdd = () => {
    let [monthStr, year] = date.split(' ')
    monthStr = monthStr.slice(0, 1).toUpperCase() + monthStr.slice(1)
    if (!Object.values(chronicleMonths).includes(monthStr)) {
      console.log('invalid date')
      return
    }

    if (!isNumber(year)) {
      console.log('invalid date')
      return
    }

    const month = Object.keys(chronicleMonths).find((key) => chronicleMonths[key] === monthStr)

    if (!month) {
      console.log('invalid date')
      return
    }

    mutate({ month: +month, year: +year })
  }

  useEffect(() => {
    if (isSuccess) {
      setDate('')
    }
  }, [isSuccess])

  return (
    <div className='flex h-[3.375rem] w-full'>
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className='h-full w-[67%] bg-tertiary text-center text-xl text-[#FFF] outline-none'
      />
      <button
        onClick={clickAdd}
        className='h-full w-[33%] bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Добавить
      </button>
    </div>
  )
}

export default AddChronicle
