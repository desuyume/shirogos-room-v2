import { FC, useState } from 'react'
import ChroniclesList from './ChroniclesList'
import { chronicleMonths } from '@/consts/months'
import { useChronicle } from '@/api/useChronicle'
import { useChroniclesCount } from '@/api/useChroniclesCount'
import { cn } from '@/utils/cn'
import ChroniclesSwitchDateBttn from './ChroniclesSwitchDateBttn'

interface IChroniclesContent {
  isActive: boolean
}

const ChroniclesContent: FC<IChroniclesContent> = ({ isActive }) => {
  const [skip, setSkip] = useState<number>(0)
  const { data: count, isLoading: isCountLoading, isError: isCountError } = useChroniclesCount()
  const { data: chronicle, isLoading, isError } = useChronicle(skip)

  const clickNext = () => {
    if (count && skip < count.count - 1) {
      setSkip((prev) => prev + 1)
    }
  }

  const clickPrev = () => {
    if (skip > 0) {
      setSkip((prev) => prev - 1)
    }
  }

  return (
    <div
      className={cn(
        '-mt-[0.8125rem] mr-1 h-[15rem] w-[13.1875rem] rounded-br-[0.8125rem] bg-tertiary bg-opacity-40 pb-[0.6875rem] pl-[0.3125rem] pr-[0.9375rem] pt-5 transition-all',
        {
          'visible opacity-100': isActive,
          'invisible opacity-0': !isActive
        }
      )}
    >
      {isCountLoading ? (
        <p className='text-center text-[0.9375rem] text-primaryText'>Загрузка</p>
      ) : isCountError ? (
        <p className='text-center text-[0.9375rem] text-primaryText'>Ошибка</p>
      ) : count && count?.count <= 0 ? (
        <p className='text-center text-[0.9375rem] text-primaryText'>Хроники не найдены</p>
      ) : (
        <>
          <div className='relative mb-[0.625rem] flex h-[1.875rem] w-[11.9375rem] items-center justify-center bg-secondaryHover px-[0.1875rem]'>
            <ChroniclesSwitchDateBttn
              skip={skip}
              count={count.count}
              type='prev'
              onClick={clickPrev}
            />
            {isLoading ? (
              <p className='text-center font-pressStart text-[0.625rem] text-primaryText'>
                Загрузка...
              </p>
            ) : isError ? (
              <p className='text-center font-pressStart text-[0.625rem] text-primaryText'>Ошибка</p>
            ) : (
              <p className='truncate px-4 text-center font-pressStart text-[0.625rem] text-primaryText'>
                {chronicleMonths[chronicle.month]} {chronicle.year}
              </p>
            )}
            <ChroniclesSwitchDateBttn
              skip={skip}
              count={count.count}
              type='next'
              onClick={clickNext}
            />
          </div>
          <ChroniclesList chronicle={chronicle ?? null} isLoading={isLoading} isError={isError} />
        </>
      )}
    </div>
  )
}

export default ChroniclesContent
