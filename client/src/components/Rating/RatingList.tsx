import { FC } from 'react'
import RatingItem from './RatingItem'
import { useThreeBestUsers } from '@/api/useThreeBestUsers'

const RatingList: FC = () => {
	const { data: bestUsers, isLoading, isError } = useThreeBestUsers()

	return isLoading ? (
		<div className='w-full h-full flex justify-center items-center'>
			<p className='text-primaryText'>Загрузка...</p>
		</div>
	) : isError ? (
		<div className='w-full h-full flex justify-center items-center'>
			<p className='text-primaryText'>Произошла ошибка</p>
		</div>
	) : (
		<div className='flex flex-col items-center'>
			<RatingItem user={bestUsers[0]} place='first' />
			<RatingItem user={bestUsers[1]} place='second' />
			<RatingItem user={bestUsers[2]} place='third' />
		</div>
	)
}

export default RatingList
