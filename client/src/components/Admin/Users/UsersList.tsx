import { useUsers } from '@/api/useUsers'
import { IFindUser } from '@/types/user.interface'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface IUsersList {
  searchQuery: string
  selectedUser: IFindUser | null
  setSelectedUser: React.Dispatch<React.SetStateAction<IFindUser | null>>
}

const UsersList: FC<IUsersList> = ({ searchQuery, selectedUser, setSelectedUser }) => {
  const { isLoading, isError, data: users } = useUsers()

  return (
    <div className='users-list mr-[0.31rem] flex max-h-[51.5625rem] min-h-[51.5625rem] w-[16.71875%] flex-col'>
      <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
        <p className='text-center text-xl text-[#FFF]'>Никнейм</p>
      </div>
      {isLoading ? (
        <div className='flex h-[48.19rem] w-full items-center justify-center bg-secondary'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[48.19rem] w-full items-center justify-center bg-secondary'>
          <p className='text-center'>Произошла ошибка</p>
        </div>
      ) : (
        <Scrollbar
          noDefaultStyles
          className='bg-secondary'
          style={{ width: '100%', minHeight: '48.19rem' }}
        >
          <div className='pr-[1.31rem] pt-[0.1875rem]'>
            {users
              .filter((user) =>
                user.twitch.displayName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() =>
                    setSelectedUser({
                      id: user.id,
                      userDisplayName: user.twitch.displayName
                    })
                  }
                  className={
                    (selectedUser?.id === user.id ? 'bg-primary ' : 'bg-transparent ') +
                    'flex h-9 w-full cursor-pointer items-center justify-center transition-all hover:bg-primary hover:bg-opacity-90'
                  }
                >
                  <p className='text-center text-xl text-[#FFF]'>{user.twitch.displayName}</p>
                </div>
              ))}
          </div>
        </Scrollbar>
      )}
    </div>
  )
}

export default UsersList
