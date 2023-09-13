import { FC } from 'react'
import UserStatsItem from './UserStatsItem'
import { IFindUser } from '@/types/user.interface'

interface IUserStats { 
	selectedUser: IFindUser | null
}

const UserStats: FC<IUserStats> = ({ selectedUser }) => {
	// TODO: fetch user stats by username or id
	const user = {
		id: 1,
		username: 'mercenaryJulian',
		panopticons: 3,
		gameOrdered: 3,
		viewingOrdered: 3,
	}

	return (
		<div className={(selectedUser ? 'opacity-100 visible ' : 'opacity-0 invisible ') + 'w-[82.1875rem] h-min flex flex-col border-l-[6px] border-primary transition-all box-content'}>
			<div className='w-full flex justify-between mb-[0.69rem]'>
				<UserStatsItem
					statTitle='Паноптикум'
					initialValue={user.panopticons}
					isDisabled
				/>
				<UserStatsItem
					statTitle='Игр заказано'
					initialValue={user.gameOrdered}
					isDisabled
				/>
				<UserStatsItem
					statTitle='Просмотра заказано'
					initialValue={user.viewingOrdered}
					isDisabled
				/>
			</div>
			<div className='w-full flex justify-between mb-[0.69rem]'>
				<UserStatsItem statTitle='ДО' />
				<UserStatsItem statTitle='Уровень' />
				<UserStatsItem statTitle='Опыт' />
			</div>
			<div className='w-full [&>div]:mb-[0.12rem] [&>div:last-of-type]:mb-0'>
				<UserStatsItem isBig statTitle='Клипы' />
				<UserStatsItem isBig statTitle='Легендарные Экзамены' />
				<UserStatsItem isBig statTitle='Участие в Турнирах Фракций' isSmallTitle />
			</div>
		</div>
	)
}

export default UserStats
