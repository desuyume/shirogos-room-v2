import { FC, useEffect, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import { IFindUser, IUser } from '@/types/user.interface'
import { Scrollbar } from 'react-scrollbars-custom'
import { useUsers } from '@/api/useUsers'
import { cn } from '@/utils/cn'

interface FindUserProps {
  multiple?: boolean
  isVisible: boolean
  className?: string
  selectType: 'users' | 'rooms'
  selectedUsers?: IFindUser[]
  setSelectedUsers?: React.Dispatch<React.SetStateAction<IFindUser[]>>
  selectedRooms?: number[]
  setSelectedRooms?: React.Dispatch<React.SetStateAction<number[]>>
}

const FindUser: FC<FindUserProps> = ({
  multiple,
  isVisible,
  className,
  selectType,
  selectedUsers,
  setSelectedUsers,
  selectedRooms,
  setSelectedRooms
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false)

  const { isLoading, isError, data: fetchedUsers } = useUsers()

  const selectUser = (user: IUser) => {
    if (!selectedUsers || !setSelectedUsers) return
    const userObj: IFindUser = {
      id: user.id,
      userDisplayName: user.twitch.displayName
    }
    const isSelected = selectedUsers.filter((user) => user.id === userObj.id).length > 0
    if (multiple) {
      setSelectedUsers((prev) =>
        isSelected ? [...prev.filter((user) => user.id !== userObj.id)] : [...prev, userObj]
      )
    } else {
      isSelected ? setSelectedUsers([]) : setSelectedUsers([userObj])
    }
  }

  const selectRoom = (roomId: number | undefined) => {
    if (!selectedRooms || !setSelectedRooms) return
    if (!roomId) return
    if (multiple) {
      setSelectedRooms((prev) =>
        selectedRooms.includes(roomId)
          ? [...prev.filter((prevRoomId) => prevRoomId !== roomId)]
          : [...prev, roomId]
      )
    } else {
      selectedRooms.includes(roomId) ? setSelectedRooms([]) : setSelectedRooms([roomId])
    }
  }

  const isSelected = (user: IUser): boolean => {
    if (selectType === 'users' && selectedUsers) {
      return selectedUsers.filter((u) => u.id === user.id).length > 0
    } else if (selectType === 'rooms' && selectedRooms && !!user.Room?.id) {
      return selectedRooms?.includes(user.Room.id)
    }

    return false
  }

  const selectAll = () => {
    if (!multiple) return

    if (isAllSelected) {
      if (selectType === 'users' && setSelectedUsers) {
        setSelectedUsers([])
      }
      if (selectType === 'rooms' && setSelectedRooms) {
        setSelectedRooms([])
      }
      return
    }

    if (selectType === 'users' && setSelectedUsers) {
      setSelectedUsers(
        filteredUsers.map((user) => ({
          id: user.id,
          userDisplayName: user.twitch.displayName
        }))
      )
    }

    if (selectType === 'rooms' && setSelectedRooms) {
      const roomsId = filteredUsers.map((user) => user.Room?.id).filter((id) => id !== undefined)
      // @ts-ignore
      setSelectedRooms(roomsId)
    }
  }

  const checkIsAllSelected = () => {
    if (selectType === 'users') {
      selectedUsers?.length === filteredUsers.length
        ? setIsAllSelected(true)
        : setIsAllSelected(false)
    }
    if (selectType === 'rooms') {
      selectedRooms?.length === filteredUsers.length
        ? setIsAllSelected(true)
        : setIsAllSelected(false)
    }
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      setFilteredUsers(
        fetchedUsers.filter((user) => (selectType === 'rooms' ? !!user.Room?.id : user))
      )
    }
  }, [isLoading, searchQuery])

  useEffect(() => {
    checkIsAllSelected()
  }, [selectedUsers, selectedRooms, filteredUsers])

  return (
    <div
      className={cn(
        'find-user z-40 flex h-[9.6875rem] w-[11.375rem] flex-col items-center bg-secondary pt-[0.19rem] transition-all',
        {
          'visible opacity-100': isVisible,
          'invisible opacity-0': !isVisible
        },
        className
      )}
    >
      <div className='relative flex min-h-[2rem] w-[96.7%] items-center bg-tertiary'>
        <img className='ml-3 w-[1.125rem]' src={searchIcon} alt='search-icon' />
        <input
          className='absolute inset-0 h-full w-full bg-transparent pl-[2.56rem] pr-1 font-secondary text-[0.9375rem] font-normal text-[#FFF] outline-none'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {multiple && (
        <button
          onClick={selectAll}
          className={cn('mt-1 w-full text-sm transition-colors', {
            'text-primary': isAllSelected,
            'text-primaryText': !isAllSelected
          })}
        >
          Выбрать всех
        </button>
      )}

      {isLoading ? (
        <div className='flex h-full w-[96.7%] items-center justify-center'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-[96.7%] items-center justify-center'>
          <p>Ошибка</p>
        </div>
      ) : (
        <Scrollbar
          noDefaultStyles
          style={{ width: '96.7%', height: '100%', marginTop: '0.25rem', marginBottom: '0.44rem' }}
        >
          <div className='flex w-[96.7%] flex-col'>
            {filteredUsers
              .filter((user) =>
                user.twitch.displayName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  className='mb-[0.38rem] flex h-4 min-w-full max-w-full items-center last-of-type:mb-0'
                >
                  <button
                    onClick={() =>
                      selectType === 'users' ? selectUser(user) : selectRoom(user.Room?.id)
                    }
                    className={cn(
                      'mr-[0.38rem] h-full min-w-[1.5625rem] max-w-[1.5625rem] border-[1px] border-primary transition-all',
                      {
                        'bg-primary': isSelected(user),
                        'bg-transparent': !isSelected(user)
                      }
                    )}
                  />
                  <p className='overflow-hidden pb-1 font-secondary text-[0.9375rem] font-normal leading-none text-[#FFF]'>
                    {user.twitch.displayName}
                  </p>
                </div>
              ))}
          </div>
        </Scrollbar>
      )}
    </div>
  )
}

export default FindUser
