import { FC } from 'react'
import AchievementItem from './AchievementItem'
import { useAchievements } from '@/api/useAchievements'

const AchievementsList: FC = () => {
	const { data: achievements, isLoading, isError } = useAchievements()

	return (
		<div className='w-[85.4%]'>
			<div className='w-full h-[3.67rem] flex justify-between mb-2'>
				<div className='w-[18.72%] h-full flex justify-center items-center bg-tertiary'>
					<p className='text-[#FFF] text-xl text-center'>Название</p>
				</div>
				<div className='w-[37.2%] h-full flex justify-center items-center bg-tertiary'>
					<p className='text-[#FFF] text-xl text-center'>Описание</p>
				</div>
				<div className='w-[14.27%] h-full flex justify-center items-center bg-tertiary'>
					<p className='text-[#FFF] text-xl text-center'>Тип награды</p>
				</div>
				<div className='w-[14.27%] h-full flex justify-center items-center bg-tertiary'>
					<p className='text-[#FFF] text-xl text-center'>Награда</p>
				</div>
				<div className='w-[13.84%] h-full flex justify-center items-center bg-tertiary'>
					<p className='text-[#FFF] text-xl text-center'>У кого есть</p>
				</div>
			</div>
			{isLoading ? (
				<div className='w-full py-4 flex justify-center items-center'>
					<p>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full py-4 flex justify-center items-center'>
					<p>Ошибка</p>
				</div>
			) : (
				<div className='w-full flex flex-col'>
					{achievements.map(achieve => (
						<AchievementItem key={achieve.id} achieve={achieve} />
					))}
					<AchievementItem />
				</div>
			)}
		</div>
	)
}

export default AchievementsList
