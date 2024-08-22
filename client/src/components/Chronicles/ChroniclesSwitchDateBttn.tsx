import { cn } from '@/utils/cn'
import { FC } from 'react'

interface ChroniclesSwitchDateBttnProps {
  skip: number
  count: number
  onClick?: () => void
  type: 'next' | 'prev'
}

const ChroniclesSwitchDateBttn: FC<ChroniclesSwitchDateBttnProps> = ({
  skip,
  count,
  onClick,
  type
}) => {
  return (
    <button
      disabled={type === 'next' ? skip === count - 1 : skip === 0}
      onClick={onClick}
      className={cn(
        'absolute h-[1.4375rem] w-[0.5625rem] bg-primary transition-all hover:w-[0.8125rem] hover:bg-primaryHover disabled:bg-opacity-80 disabled:hover:w-[0.5625rem] disabled:hover:bg-primary disabled:hover:bg-opacity-80',
        {
          'right-[0.1875rem]': type === 'next',
          'left-[0.1875rem]': type === 'prev'
        }
      )}
    />
  )
}

export default ChroniclesSwitchDateBttn
