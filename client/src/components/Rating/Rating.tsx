import { FC } from 'react'
import RatingList from './RatingList'

interface IRating {
  className?: string
}

const Rating: FC<IRating> = ({ className }) => {
  return (
    <div
      className={
        'flex h-[17.1875rem] w-[26.625rem] flex-col items-center rounded-[2.3125rem] bg-secondary bg-opacity-40 pt-[0.38rem] ' +
        className
      }
      style={{
        background:
          'linear-gradient(137deg, rgba(23, 23, 23, 0.20) 0%, rgba(36, 36, 36, 0.20) 46.88%), rgba(24, 24, 24, 0.40)'
      }}
    >
      <div className='mb-[0.9375rem] flex h-[2.125rem] w-[14.6875rem] items-center justify-center rounded-[2.3125rem] bg-secondary'>
        <p className='text-center text-[1.875rem] leading-none text-primary'>ТОП</p>
      </div>
      <RatingList />
    </div>
  )
}

export default Rating
