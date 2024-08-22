import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import UsersList from '@/components/Admin/Users/UsersList'
import { IFindUser } from '@/types/user.interface'
import UserStats from '@/components/Admin/Users/UserStats'

const Users: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<IFindUser | null>(null)

  return (
    <AdminWrapper>
      <div className='ml-4 mt-[0.69rem] h-full w-full'>
        <div className='relative mb-[0.63rem] flex h-[2.9375rem] w-[16.71875%] items-center'>
          <img className='absolute left-3 h-[2.1875rem]' src={searchIcon} alt='search-icon' />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='h-full w-full bg-tertiary pl-[4.06rem] pr-2 font-secondary text-[1.5625rem] font-normal text-[#FFF] outline-none'
          />
        </div>
        <div className='flex'>
          <UsersList
            searchQuery={searchQuery}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <UserStats selectedUser={selectedUser} />
        </div>
      </div>
    </AdminWrapper>
  )
}

export default Users
