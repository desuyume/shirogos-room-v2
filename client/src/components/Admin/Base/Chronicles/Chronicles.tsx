import { FC, useState } from 'react'
import ChroniclesList from './ChroniclesList'
import AddChronicle from './AddChronicle'
import ChronicleEventsList from './ChronicleEventsList'
import AddChronicleEvent from './AddChronicleEvent'

const Chronicles: FC = () => {
  const [isAddChronicleVisible, setIsAddChronicleVisible] = useState(false)
  const [selectedChronicle, setSelectedChronicle] = useState<number | null>(null)

  return (
    <div className='flex h-[26.0625rem] w-[49.26%] justify-between'>
      <div className='chronicles-dates-admin h-full w-[49.85%]'>
        <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
          <p className='text-[1.875rem] text-[#FFF]'>Хроники</p>
        </div>
        <ChroniclesList
          selectedChronicle={selectedChronicle}
          setSelectedChronicle={setSelectedChronicle}
        />
        <AddChronicle />
      </div>
      <div className='chronicles-admin h-full w-[49.85%]'>
        <div className='h-[3.375rem] w-full bg-tertiary' />
        <ChronicleEventsList chronicleId={selectedChronicle} />
        <button
          onClick={() => setIsAddChronicleVisible(true)}
          disabled={!selectedChronicle}
          className='h-[2.0625rem] w-full bg-primary text-[0.9375rem] text-[#FFF] transition-all enabled:hover:bg-primaryHover disabled:opacity-50'
        >
          Добавить Дату
        </button>
        <AddChronicleEvent
          chronicleId={selectedChronicle}
          visible={isAddChronicleVisible}
          setVisible={setIsAddChronicleVisible}
        />
      </div>
    </div>
  )
}

export default Chronicles
