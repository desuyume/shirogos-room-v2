import { useChronicles } from '@/api/useChronicles'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import ChroniclesItem from './ChroniclesItem'

interface IChroniclesDatesList {
  selectedChronicle: number | null
  setSelectedChronicle: React.Dispatch<React.SetStateAction<number | null>>
}

const ChroniclesList: FC<IChroniclesDatesList> = ({ selectedChronicle, setSelectedChronicle }) => {
  const { isLoading, isError, data: chronicles } = useChronicles()

  return (
    <Scrollbar
      noDefaultStyles
      className='bg-secondary'
      style={{ height: '19.31rem', minHeight: '19.31rem' }}
    >
      {isLoading ? (
        <div className='flex h-[19.31rem] w-full items-center justify-center bg-secondary'>
          <p className='text-center text-xl text-primary'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[19.31rem] w-full items-center justify-center bg-secondary'>
          <p className='text-center text-xl text-primary'>Ошибка</p>
        </div>
      ) : (
        <div className='w-full bg-secondary'>
          {chronicles.map((chronicle) => (
            <ChroniclesItem
              key={chronicle.id}
              id={chronicle.id}
              month={chronicle.month}
              year={chronicle.year}
              selectedChronicle={selectedChronicle}
              setSelectedChronicle={setSelectedChronicle}
            />
          ))}
        </div>
      )}
    </Scrollbar>
  )
}

export default ChroniclesList
