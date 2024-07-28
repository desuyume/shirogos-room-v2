import { useUsers } from '@/api/useUsers'
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
	const { isLoading, isError, data: users } = useUsers()

	return (
		<div className='w-[16.71875%] max-h-[51.5625rem] min-h-[51.5625rem] flex flex-col mr-[0.31rem] users-list'>
			<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
				<p className='text-[#FFF] text-xl text-center'>Никнейм</p>
			</div>
			{isLoading ? (
				<div className='h-[48.19rem] w-full bg-secondary flex justify-center items-center'>
					<p>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='h-[48.19rem] w-full bg-secondary flex justify-center items-center'>
					<p className='text-center'>Произошла ошибка</p>
				</div>
			) : (
				<Scrollbar
					noDefaultStyles
					className='bg-secondary'
					style={{ width: '100%', minHeight: '48.19rem' }}
				>
					<div className='pt-[0.1875rem] pr-[1.31rem]'>
						{users
							.filter(user =>
								user.twitch.displayName
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
							)
							.map(user => (
								<div
									key={user.id}
									onClick={() =>
										setSelectedUser({
											id: user.id,
											userDisplayName: user.twitch.displayName,
										})
									}
									className={
										(selectedUser?.id === user.id
											? 'bg-primary '
											: 'bg-transparent ') +
										'w-full h-9 flex justify-center items-center cursor-pointer hover:bg-primary hover:bg-opacity-90 transition-all'
									}
								>
									<p className='text-[#FFF] text-center text-xl'>
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

export default UsersList
