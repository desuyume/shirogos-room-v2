import { FC } from 'react'
import RatingItem from './RatingItem'
import { useThreeBestUsers } from '@/api/useThreeBestUsers'

const RatingList: FC = () => {
  const { data: bestUsers, isLoading, isError } = useThreeBestUsers()

  return isLoading ? (
    <div className='flex h-full w-full items-center justify-center'>
      <p className='text-primaryText'>Загрузка...</p>
    </div>
  ) : isError ? (
    <div className='flex h-full w-full items-center justify-center'>
      <p className='text-primaryText'>Произошла ошибка</p>
    </div>
  ) : (
    <div className='flex flex-col items-center'>
      {bestUsers[0] && <RatingItem user={bestUsers[0]} place='first' />}
      {bestUsers[1] && <RatingItem user={bestUsers[1]} place='second' />}
      {bestUsers[2] && <RatingItem user={bestUsers[2]} place='third' />}
    </div>
  )
}

export default RatingList
