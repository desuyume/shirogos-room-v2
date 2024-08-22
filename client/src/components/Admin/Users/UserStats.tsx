import { FC } from 'react'
import UserStatsItem from './UserStatsItem'
import { IFindUser } from '@/types/user.interface'
import { useUserStats } from '@/api/useUserStats'

interface IUserStats {
  selectedUser: IFindUser | null
}

const UserStats: FC<IUserStats> = ({ selectedUser }) => {
  const { isLoading, isError, data: userStats } = useUserStats(selectedUser?.id ?? null)

  return (
    <div
      className={
        (selectedUser ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'box-content flex h-min w-[82.1875rem] flex-col border-l-[6px] border-primary transition-all'
      }
    >
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-center'>Произошла ошибка</p>
        </div>
      ) : (
        <>
          <div className='mb-[0.69rem] flex w-full justify-between'>
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
          <div className='mb-[0.69rem] flex w-full justify-between'>
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
          <div className='w-full [&>div:last-of-type]:mb-0 [&>div]:mb-[0.12rem]'>
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
