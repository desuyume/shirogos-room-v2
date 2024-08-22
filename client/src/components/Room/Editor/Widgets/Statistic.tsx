import { FC } from 'react'
import { useRoomStats } from '@/api/useRoomStats'
import { IStats } from '@/types/room.interface'

interface IStatistic {
  isGuide?: boolean
  guideStats?: IStats
}

const Statistic: FC<IStatistic> = ({ isGuide, guideStats }) => {
  const { data: stats, isLoading, isError } = useRoomStats(!isGuide)

  return (
    <>
      <div className='handle relative flex h-full w-full flex-col items-center'>
        <div className='my-[4.15%] flex aspect-[233.77/39] w-[51.77%] items-center justify-center rounded-[1.5625rem] bg-tertiary'>
          <p className='pointer-events-none text-[1vw] leading-[97.8%] text-primaryText'>
            Статистика
          </p>
        </div>
        {isLoading && !isGuide ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-[0.73vw] leading-none text-primaryText'>Загрузка...</p>
          </div>
        ) : isError && !isGuide ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-[0.73vw] leading-none text-primaryText'>Ошибка</p>
          </div>
        ) : (
          <div className='flex w-full flex-col items-center px-[3.1%] [&>div:last-of-type]:mb-0 [&>div]:mb-[1.278%]'>
            <div className='flex aspect-[424/47] w-full rounded-[1.5625rem] bg-tertiary bg-opacity-50'>
              <div className='flex h-full flex-1 items-center justify-center'>
                <p className='pointer-events-none text-center text-[0.73vw] leading-none text-primaryText'>
                  Открыто картинок в Паноптикуме
                </p>
              </div>
              <div className='pointer-events-none flex aspect-[86.05/47] h-full items-center justify-center rounded-[1.5625rem] bg-[#8CAFB1]'>
                <p className='text-center text-[0.65vw] text-primaryText'>
                  {isGuide ? guideStats?.panopticons_count : stats?.panopticons_count}
                </p>
              </div>
            </div>
            <div className='flex aspect-[424/47] w-full rounded-[1.5625rem] bg-tertiary bg-opacity-50'>
              <div className='flex h-full flex-1 items-center justify-center'>
                <p className='pointer-events-none text-center text-[0.73vw] leading-none text-primaryText'>
                  Сделано клипов для Нарезок
                </p>
              </div>
              <div className='flex aspect-[86.05/47] h-full items-center justify-center rounded-[1.5625rem] bg-[#67B8BD]'>
                <p className='pointer-events-none text-center text-[0.65vw] text-primaryText'>
                  {isGuide ? guideStats?.clips : stats?.clips}
                </p>
              </div>
            </div>
            <div className='flex aspect-[424/47] w-full rounded-[1.5625rem] bg-tertiary bg-opacity-50'>
              <div className='flex h-full flex-1 items-center justify-center'>
                <p className='pointer-events-none text-center text-[0.73vw] leading-none text-primaryText'>
                  Игр заказано
                </p>
              </div>
              <div className='flex aspect-[86.05/47] h-full items-center justify-center rounded-[1.5625rem] bg-[#7FB5B8]'>
                <p className='pointer-events-none text-center text-[0.65vw] text-primaryText'>
                  {isGuide ? guideStats?.games_ordered : stats?.games_ordered}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Statistic
