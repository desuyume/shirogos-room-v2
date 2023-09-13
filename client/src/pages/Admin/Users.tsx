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
			<div className='w-full h-full mt-[0.69rem] ml-4'>
				<div className='w-[16.71875%] h-[2.9375rem] relative flex items-center mb-[0.63rem]'>
					<img
						className='absolute h-[2.1875rem] left-3'
						src={searchIcon}
						alt='search-icon'
					/>
					<input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='w-full h-full bg-tertiary outline-none pl-[4.06rem] pr-2 font-secondary font-normal text-[1.5625rem] text-[#FFF]' />
				</div>
				<div className='flex'>
					<UsersList searchQuery={searchQuery} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
					<UserStats selectedUser={selectedUser} />
				</div>
			</div>
		</AdminWrapper>
	)
}

export default Users
