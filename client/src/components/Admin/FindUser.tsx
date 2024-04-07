import { FC, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import { IUser } from '@/types/user.interface'
import { Scrollbar } from 'react-scrollbars-custom'
import { useUsers } from '@/api/useUsers'

interface FindUserProps {
	multiple?: boolean
	isVisible: boolean
	className?: string
	selectType: 'users' | 'rooms'
	selectedUsers?: string[]
	setSelectedUsers?: React.Dispatch<React.SetStateAction<string[]>>
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
	setSelectedRooms,
}) => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const { isLoading, isError, data: users } = useUsers()

	const selectUser = (user: IUser) => {
		if (!selectedUsers || !setSelectedUsers) return
		if (multiple) {
			setSelectedUsers(prev =>
				selectedUsers.includes(user.username)
					? [...prev.filter(username => username !== user.username)]
					: [...prev, user.username]
			)
		} else {
			selectedUsers.includes(user.username)
				? setSelectedUsers([])
				: setSelectedUsers([user.username])
		}
	}

	const selectRoom = (user: IUser) => {
		if (!selectedRooms || !setSelectedRooms) return
		if (multiple) {
			setSelectedRooms(prev =>
				selectedRooms.includes(user.Room.id)
					? [...prev.filter(roomId => roomId !== user.Room.id)]
					: [...prev, user.Room.id]
			)
		} else {
			selectedRooms.includes(user.Room.id)
				? setSelectedRooms([])
				: setSelectedRooms([user.Room.id])
		}
	}

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-[11.375rem] h-[9.6875rem] bg-secondary pt-[0.19rem] flex flex-col items-center transition-all find-user z-40' +
				(!!className ? ` ${className}` : '')
			}
		>
			<div className='w-[96.7%] min-h-[2rem] bg-tertiary flex items-center relative mb-2'>
				<img className='w-[1.125rem] ml-3' src={searchIcon} alt='search-icon' />
				<input
					className='w-full h-full absolute inset-0 bg-transparent outline-none pl-[2.56rem] pr-1 text-[0.9375rem] text-[#FFF] font-secondary font-normal'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
			</div>
			{isLoading ? (
				<div className='w-[96.7%] h-full flex justify-center items-center'>
					<p>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-[96.7%] h-full flex justify-center items-center'>
					<p>Ошибка</p>
				</div>
			) : (
				<Scrollbar
					noDefaultStyles
					style={{ width: '96.7%', height: '100%', marginBottom: '0.44rem' }}
				>
					<div className='w-[96.7%] flex flex-col'>
						{users
							.filter(donate =>
								donate.username
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
							)
							.map(user => (
								<div
									key={user.id}
									className='min-w-full max-w-full h-4 flex items-center mb-[0.38rem] last-of-type:mb-0'
								>
									<button
										onClick={() =>
											selectType === 'users'
												? selectUser(user)
												: selectRoom(user)
										}
										className={
											(selectedUsers?.includes(user.username) ||
											selectedRooms?.includes(user.Room.id)
												? 'bg-primary '
												: 'bg-transparent ') +
											'min-w-[1.5625rem] max-w-[1.5625rem] h-full border-[1px] border-primary mr-[0.38rem] transition-all'
										}
									/>
									<p className='text-[#FFF] text-[0.9375rem] font-secondary font-normal pb-1 leading-none overflow-hidden'>
										{user.username}
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
