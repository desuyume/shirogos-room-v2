import { FC, useState } from 'react'
import ChroniclesContent from './ChroniclesContent'
import { cn } from '@/utils/cn'

const Chronicles: FC = () => {
  const [isChroniclesActive, setIsChroniclesActive] = useState<boolean>(false)

  return (
    <div className='absolute right-0 top-[15rem] flex flex-col items-end'>
      <button
        onClick={() => setIsChroniclesActive(!isChroniclesActive)}
        className={cn(
          'z-10 h-[1.75rem] translate-x-[1.875rem] rounded-[3.5rem] bg-primary text-left font-pressStart text-[0.625rem] transition-all hover:w-[15.875rem] hover:translate-x-[1.875rem] hover:bg-primaryHover hover:pl-[5rem]',
          {
            'w-[15.875rem] pl-[5rem] text-white': isChroniclesActive,
            'w-[11.9375rem] pl-[3.25rem] text-primaryText hover:text-white': !isChroniclesActive
          }
        )}
      >
        Хроники
      </button>
      <ChroniclesContent isActive={isChroniclesActive} />
    </div>
  )
}

export default Chronicles
