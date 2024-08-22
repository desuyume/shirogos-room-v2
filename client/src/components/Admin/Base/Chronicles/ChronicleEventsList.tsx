import { FC } from 'react'
import ChronicleEventsItem from './ChronicleEventsItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { useChronicleEvents } from '@/api/useChronicleEvents'

interface IChronicleEventsList {
  chronicleId: number | null
}

const ChronicleEventsList: FC<IChronicleEventsList> = ({ chronicleId }) => {
  const { isLoading, isError, data: chronicles } = useChronicleEvents(chronicleId)

  if (!chronicleId) {
    return (
      <div className='flex h-[20.64rem] w-full items-center justify-center bg-secondary'>
        <p className='text-center text-xl text-primaryText'>Дата не выбрана</p>
      </div>
    )
  }

  return (
    <Scrollbar
      noDefaultStyles
      className='bg-secondary'
      style={{ height: '20.64rem', minHeight: '20.64rem' }}
    >
      {isLoading ? (
        <div className='flex h-[20.64rem] w-full items-center justify-center bg-secondary'>
          <p className='text-center text-xl text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[20.64rem] w-full items-center justify-center bg-secondary'>
          <p className='text-center text-xl text-primaryText'>Ошибка</p>
        </div>
      ) : !chronicles.events || !chronicles.events.length ? (
        <div className='flex h-[20.64rem] w-full items-center justify-center bg-secondary'>
          <p className='text-center text-xl text-primaryText'>Нет событий</p>
        </div>
      ) : (
        <div className='w-full bg-secondary py-[0.7rem]'>
          {chronicles.events.map((event) => (
            <ChronicleEventsItem
              key={event.id}
              id={event.id}
              chronicleId={chronicleId}
              day={event.day}
              prefix={event.prefix}
              text={event.text}
              img={event.img}
            />
          ))}
        </div>
      )}
    </Scrollbar>
  )
}

export default ChronicleEventsList
