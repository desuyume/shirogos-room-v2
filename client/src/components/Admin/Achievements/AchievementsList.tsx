import { FC } from 'react'
import AchievementItem from './AchievementItem'
import { IAchievemnt } from '@/types/achievements.interface'
import AddAchievement from './AddAchievement'

const AchievementsList: FC = () => {
	const achievements: IAchievemnt[] = [
		{
			id: 1,
			name: 'Хэллоуин 2018',
			description:
				'Выдавалось за участие в ивенте “Ночь на Хэллоуин” 2018 года',
			awardType: ['badge'],
			bgImg: null,
			users: ['mercenaryJulian'],
		},
		{
			id: 2,
			name: 'Хэллоуин 2018',
			description:
				'Выдавалось за участие в ивенте “Ночь на Хэллоуин” 2018 года',
			awardType: ['badge'],
			bgImg: null,
			users: ['mercenaryJulian'],
		},
		{
			id: 3,
			name: 'Хэллоуин 2018',
			description:
				'Выдавалось за участие в ивенте “Ночь на Хэллоуин” 2018 года',
			awardType: ['badge'],
			bgImg: null,
			users: ['mercenaryJulian'],
		},
		{
			id: 4,
			name: 'Хэллоуин 2018',
			description:
				'Выдавалось за участие в ивенте “Ночь на Хэллоуин” 2018 года',
			awardType: ['badge'],
			bgImg: null,
			users: ['mercenaryJulian'],
		},
	]

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
			<div className='w-full flex flex-col'>
				{achievements.map(achieve => (
					<AchievementItem
						key={achieve.id}
						achieve={achieve}
					/>
				))}
				<AddAchievement />
			</div>
		</div>
	)
}

export default AchievementsList
