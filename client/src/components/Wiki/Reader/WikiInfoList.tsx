import { FC } from 'react'
import WikiInfoItem from './WikiInfoItem'
import { IDescription } from '@/types/wiki.interface'

interface IWikiInfoList {
  descriptions: IDescription[]
}

const WikiInfoList: FC<IWikiInfoList> = ({ descriptions }) => {
  return (
    <div className='z-10 ml-[2.6875rem] mt-[4.5rem] transition-all duration-1000 ease-out'>
      {descriptions.map((description) => (
        <WikiInfoItem
          key={description.id}
          type={description.title}
          value={description.description}
        />
      ))}
    </div>
  )
}

export default WikiInfoList
