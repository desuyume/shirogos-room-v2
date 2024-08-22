import { FC } from 'react'
import ChroniclesItem from './ChroniclesItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { chronicleMonths } from '@/consts/months'
import { IChronicleWithEvents } from '@/types/chronicle.interface'

interface IChroniclesList {
  chronicle: IChronicleWithEvents | null
  isLoading: boolean
  isError: boolean
}

const ChroniclesList: FC<IChroniclesList> = ({ chronicle, isError, isLoading }) => {
  return (
    <Scrollbar noDefaultStyles style={{ height: 169 }}>
      {isLoading ? (
        <div className='flex h-[10.5625rem] w-full items-center justify-center'>
          <p className='text-center text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[10.5625rem] w-full items-center justify-center'>
          <p className='text-center text-primaryText'>Произошла ошибка</p>
        </div>
      ) : (
        chronicle?.events.map((event) => (
          <ChroniclesItem
            key={event.id}
            date={chronicleMonths[chronicle.month] + ' ' + event.day}
            day={event.day}
            prefix={event.prefix}
            text={event.text}
            img={event.img}
          />
        ))
      )}
    </Scrollbar>
  )
}

export default ChroniclesList
