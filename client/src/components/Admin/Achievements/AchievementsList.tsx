import { FC } from 'react'
import AchievementItem from './AchievementItem'
import { useAchievements } from '@/api/useAchievements'

const AchievementsList: FC = () => {
  const { data: achievements, isLoading, isError } = useAchievements()

  return (
    <div className='w-[85.4%]'>
      <div className='mb-2 flex h-[3.67rem] w-full justify-between'>
        <div className='flex h-full w-[18.72%] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Название</p>
        </div>
        <div className='flex h-full w-[37.2%] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Описание</p>
        </div>
        <div className='flex h-full w-[14.27%] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Тип награды</p>
        </div>
        <div className='flex h-full w-[14.27%] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Награда</p>
        </div>
        <div className='flex h-full w-[13.84%] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>У кого есть</p>
        </div>
      </div>
      {isLoading ? (
        <div className='flex w-full items-center justify-center py-4'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex w-full items-center justify-center py-4'>
          <p>Ошибка</p>
        </div>
      ) : (
        <div className='flex w-full flex-col'>
          {achievements.map((achieve) => (
            <AchievementItem key={achieve.id} achieve={achieve} />
          ))}
          <AchievementItem />
        </div>
      )}
    </div>
  )
}

export default AchievementsList
