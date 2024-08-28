import HTMLReactParser from 'html-react-parser'
import { FC } from 'react'

interface IWikiInfoItem {
  type: string
  value: string
}

const WikiInfoItem: FC<IWikiInfoItem> = ({ type, value }) => {
  return (
    <div className='mb-[0.94rem] flex last-of-type:mb-0'>
      <div className='mr-6 flex w-[10.375rem] items-center justify-center bg-tertiary bg-opacity-80'>
        <p className='max-w-full text-center font-secondary text-xl font-normal break-words px-1 py-1 leading-4 text-primaryText'>{type}</p>
      </div>
      <div className='w-[43.125rem] py-[0.7rem] font-secondary text-[1.125rem] text-primaryText'>
        {HTMLReactParser(value)}
      </div>
    </div>
  )
}

export default WikiInfoItem
