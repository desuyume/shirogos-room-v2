import { FC } from 'react'
import UserStatsItem from './UserStatsItem'
import { IFindUser } from '@/types/user.interface'
import { useUserStats } from '@/api/useUserStats'

interface IUserStats {
	selectedUser: IFindUser | null
}

const UserStats: FC<IUserStats> = ({ selectedUser }) => {
	const {
		isLoading,
		isError,
		data: userStats,
	} = useUserStats(selectedUser?.id ?? null)

	return (
		<div
			className={
				(selectedUser ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-[82.1875rem] h-min flex flex-col border-l-[6px] border-primary transition-all box-content'
			}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center'>Произошла ошибка</p>
				</div>
			) : (
				<>
					<div className='w-full flex justify-between mb-[0.69rem]'>
						<UserStatsItem
							statTitle='Паноптикум'
							initialValue={userStats.panopticons}
							isDisabled
							userId={selectedUser?.id}
							type='panopticons'
						/>
						<UserStatsItem
							statTitle='Игр заказано'
							initialValue={userStats.games_ordered}
							isDisabled
							userId={selectedUser?.id}
							type='games'
						/>
						<UserStatsItem
							statTitle='Просмотра заказано'
							initialValue={userStats.viewing_ordered}
							isDisabled
							userId={selectedUser?.id}
							type='viewings'
						/>
					</div>
					<div className='w-full flex justify-between mb-[0.69rem]'>
						<UserStatsItem
							initialValue={userStats.dangos}
							statTitle='ДО'
							userId={selectedUser?.id}
							type='dangos'
						/>
						<UserStatsItem
							initialValue={userStats.level}
							statTitle='Уровень'
							userId={selectedUser?.id}
							type='level'
						/>
						<UserStatsItem
							initialValue={userStats.exp}
							statTitle='Опыт'
							userId={selectedUser?.id}
							type='exp'
						/>
					</div>
					<div className='w-full [&>div]:mb-[0.12rem] [&>div:last-of-type]:mb-0'>
						<UserStatsItem
							initialValue={userStats.clips}
							isBig
							statTitle='Клипы'
							userId={selectedUser?.id}
							type='clips'
						/>
						<UserStatsItem
							initialValue={userStats.legendary_exams}
							isBig
							statTitle='Легендарные Экзамены'
							userId={selectedUser?.id}
							type='exams'
						/>
						<UserStatsItem
							initialValue={userStats.fraction_tournaments}
							isBig
							statTitle='Участие в Турнирах Фракций'
							isSmallTitle
							userId={selectedUser?.id}
							type='fractions'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default UserStats
