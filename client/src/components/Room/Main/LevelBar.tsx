import { cn } from '@/utils/cn'
import { FC } from 'react'

interface LevelBarProps {
  level: number
  exp: number
}

const LevelBar: FC<LevelBarProps> = ({ level, exp }) => {
  return (
    <div className='absolute bottom-[2px] h-[6.4375rem] w-[calc(100%-2px)] overflow-hidden rounded-l-[1.5625rem]'>
      <div className='relative h-full w-full'>
        <div className='absolute h-full w-[calc(100%-31px)] rounded-l-[1.5625rem] bg-[#4A9648]' />

        <div className='absolute bottom-0 flex h-[38px] w-[calc(100%-11px)] items-center justify-end'>
          <svg
            width='77'
            height='151'
            viewBox='0 0 77 151'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M77 75.5L0.500001 150.411L0.500007 0.588803L77 75.5Z' fill='#4A9648' />
          </svg>
        </div>
      </div>

      <div className='absolute bottom-0 z-10 flex h-[38px] w-full items-center justify-center'>
        <p className='line-clamp-2 break-words px-8 text-center text-[0.9375rem] leading-none text-primaryText'>
          Уровень {level}
        </p>
      </div>

      <div className='absolute bottom-0 flex h-[6.4375rem] w-[calc(100%-31px)] rounded-l-[1.5625rem]'>
        <div
          style={{ width: `${exp}%` }}
          className={cn('relative flex h-full items-end rounded-l-[1.5625rem] bg-[#79C677]', {
            'bg-transparent': exp < 7
          })}
        >
          <div className='relative flex h-[38px] w-full items-center justify-end'>
            <svg
              width='77'
              height='151'
              viewBox='0 0 77 151'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute -right-[20px]'
            >
              <path d='M77 75.5L0.500001 150.411L0.500007 0.588803L77 75.5Z' fill='#79C677' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelBar
