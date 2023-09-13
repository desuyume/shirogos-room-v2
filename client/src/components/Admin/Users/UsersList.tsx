import { IFindUser } from '@/types/user.interface'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface IUsersList {
	searchQuery: string
	selectedUser: IFindUser | null
	setSelectedUser: React.Dispatch<React.SetStateAction<IFindUser | null>>
}

const UsersList: FC<IUsersList> = ({
	searchQuery,
	selectedUser,
	setSelectedUser,
}) => {
	const users = [
		{ id: 1, username: 'Mode_Of_God' },
		{ id: 2, username: 'mercenaryJulian' },
		{ id: 3, username: 'desuyume' },
		{ id: 4, username: '970710hex' },
		{ id: 5, username: 'chusui_' },
	]

	return (
		<div className='w-[16.71875%] max-h-[51.5625rem] min-h-[51.5625rem] flex flex-col mr-[0.31rem] users-list'>
			<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
				<p className='text-[#FFF] text-xl text-center'>Никнейм</p>
			</div>
			<Scrollbar noDefaultStyles className='bg-secondary' style={{ width: '100%', minHeight: '48.19rem' }}>
				<div className='pt-[0.1875rem] pr-[1.31rem]'>
					{users
						.filter(donate =>
							donate.username.toLowerCase().includes(searchQuery.toLowerCase())
						)
						.map(user => (
							<div
								key={user.id}
								onClick={() => setSelectedUser(user)}
								className={
									(selectedUser?.id === user.id
										? 'bg-primary '
										: 'bg-transparent ') +
									'w-full h-9 flex justify-center items-center cursor-pointer hover:bg-primary hover:bg-opacity-90 transition-all'
								}
							>
								<p className='text-[#FFF] text-center text-xl'>
									{user.username}
								</p>
							</div>
						))}
				</div>
			</Scrollbar>
		</div>
	)
}

export default UsersList
