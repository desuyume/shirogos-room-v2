import { FC } from 'react'

interface IAlmanacSwitchBttn {
  onClick: () => void
  date: number
  month: string
}

const AlmanacSwitchBttn: FC<IAlmanacSwitchBttn> = ({ onClick, date, month }) => {
  return (
    <button
      className='h-full min-w-[50px] rounded-[24px] bg-secondary text-primaryText transition-colors hover:bg-secondaryHover hover:text-[#FFF]'
      onClick={onClick}
    >
      <p className='text-3xl leading-none'>{date}</p>
      <p className='text-[0.9375rem]'>{month}</p>
    </button>
  )
}

export default AlmanacSwitchBttn
