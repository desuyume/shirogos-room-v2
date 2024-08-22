import { useBirthdayAward } from '@/api/useBirthdayAward'
import { useUpdateBirthdayAward } from '@/api/useUpdateBirthdayAward'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BirthdayAward: FC = () => {
  const { isLoading, isError, data: awardData } = useBirthdayAward()
  const { mutate, isSuccess } = useUpdateBirthdayAward()
  const [award, setAward] = useState<string>('')

  const onBlurHandler = () => {
    if (!award) {
      setAward('0')
    }

    if (isNumber(award)) {
      mutate({ award: +award })
    } else {
      toast.warning('Награда должна быть числом !')
    }
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      setAward(String(awardData.award))
    }
  }, [isLoading, isError])

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Установлена награда в ${award} ДО !`)
    }
  }, [isSuccess])

  return (
    <div className='flex h-full w-[33.6%] flex-col'>
      <div className='flex h-[3.8125rem] w-full items-center justify-center bg-tertiary'>
        <p className='text-[1.5625rem] text-[#FFF]'>Награда за ДР</p>
      </div>
      <div className='flex w-full flex-1 items-center justify-center bg-secondary '>
        <input
          onBlur={onBlurHandler}
          value={award}
          onChange={(e) => setAward(e.target.value)}
          className='w-full bg-transparent text-center text-xl text-[#FFF] outline-none placeholder:text-[#B7B7B7]'
          placeholder='(в до)'
        />
      </div>
    </div>
  )
}

export default BirthdayAward
