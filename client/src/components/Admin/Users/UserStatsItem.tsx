import { useAddUserStats } from '@/api/useAddUserStats'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'

interface IUserStatsItem {
  initialValue?: number
  isDisabled?: boolean
  isBig?: boolean
  statTitle: string
  isSmallTitle?: boolean
  userId?: number
  type: string
}

const UserStatsItem: FC<IUserStatsItem> = ({
  initialValue,
  isDisabled,
  isBig,
  statTitle,
  isSmallTitle,
  userId,
  type
}) => {
  const [value, setValue] = useState<string>('0')
  const { mutate, isSuccess } = useAddUserStats(userId ?? null, type)

  const clickAdd = () => {
    if (isNumber(value)) {
      mutate({ value: +value })
    } else {
      console.log('value must be number')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setValue('0')
    }
  }, [isSuccess])

  return (
    <div className={(isDisabled ? 'h-[2.6875rem] ' : 'h-[3.375rem] ') + 'flex'}>
      <div
        className={
          (isDisabled ? 'bg-opacity-50 ' : '') +
          (isBig || isDisabled ? 'w-[9.75rem] ' : 'w-[5.0625rem] ') +
          'mr-[0.19rem] flex h-full items-center justify-center bg-tertiary px-4'
        }
      >
        <p
          className={
            (isDisabled ? 'text-opacity-50 ' : '') +
            (isSmallTitle ? 'text-xs ' : 'text-[0.9375rem] ') +
            'text-center leading-none text-[#FFF]'
          }
        >
          {statTitle}
        </p>
      </div>
      <div
        className={
          (isDisabled ? 'hidden ' : 'block ') +
          (isBig ? 'w-[43.875rem] ' : 'w-[9.25rem] ') +
          'mr-[0.19rem] h-full bg-secondary'
        }
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='h-full w-full bg-transparent text-center text-xl text-[#FFF] outline-none'
        />
      </div>
      <div
        className={
          (isDisabled ? 'w-[9.25rem] bg-opacity-50 ' : 'mr-[0.19rem] ') +
          (isBig ? 'w-[21.9375rem] ' : '') +
          (!isDisabled && !isBig ? 'w-[5.75rem] ' : '') +
          'flex h-full items-center justify-center bg-secondary'
        }
      >
        <p className='text-center text-xl text-[#FFF] text-opacity-50'>{initialValue ?? '0'}</p>
      </div>
      <button
        onClick={clickAdd}
        className={
          (isDisabled ? 'invisible opacity-0 ' : 'visible opacity-100 ') +
          'h-full w-[6.0625rem] bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
        }
      >
        Добавить
      </button>
    </div>
  )
}

export default UserStatsItem
