import { useDeleteChronicle } from '@/api/useDeleteChronicle'
import { chronicleMonths } from '@/consts/months'
import { FC } from 'react'

interface IChroniclesItem {
  id: number
  month: number
  year: number
  selectedChronicle: number | null
  setSelectedChronicle: React.Dispatch<React.SetStateAction<number | null>>
}

const ChroniclesItem: FC<IChroniclesItem> = ({
  id,
  month,
  year,
  selectedChronicle,
  setSelectedChronicle
}) => {
  const { mutate } = useDeleteChronicle(id)

  const clickDelete = () => {
    mutate()
    if (id === selectedChronicle) {
      setSelectedChronicle(null)
    }
  }

  return (
    <div className='z-10 flex h-[1.9375rem] w-full items-center'>
      <button
        onClick={clickDelete}
        className='h-full px-2 text-center text-[#FFF] transition-all hover:bg-primary'
      >
        -
      </button>
      <button
        key={id}
        onClick={() => setSelectedChronicle(id)}
        className={
          (selectedChronicle === id ? 'bg-primary ' : 'hover:bg-primaryHover ') +
          'h-full w-full text-center text-xl text-[#FFF] transition-all'
        }
      >
        {chronicleMonths[month]} {year}
      </button>
    </div>
  )
}

export default ChroniclesItem
