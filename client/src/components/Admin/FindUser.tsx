import { FC, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import { IFindUser } from '@/types/user.interface'
import { Scrollbar } from 'react-scrollbars-custom'

interface FindUserProps {
	multiple?: boolean
	isVisible: boolean
	className?: string
	selectedUsers: string[]
	setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>
}

const FindUser: FC<FindUserProps> = ({
	multiple,
	isVisible,
	className,
	selectedUsers,
	setSelectedUsers,
}) => {
	const [searchQuery, setSearchQuery] = useState<string>('')

	const users: IFindUser[] = [
		{ id: 1, username: 'mercenaryJulian' },
		{ id: 2, username: 'Mode_Of_God' },
		{ id: 3, username: 'fadfafa' },
		{ id: 4, username: 'fgdgdfh' },
		{ id: 5, username: 'jghkmnb' },
		{ id: 6, username: 'bcvbcb' },
		{ id: 7, username: 'bvcerwr2wer' },
		{ id: 8, username: 'bvcbc' },
		{ id: 9, username: 'gdfgd' },
		{ id: 10, username: 'svcsgsdc' },
	]

	const selectUser = (user: IFindUser) => {
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

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-[11.375rem] h-[9.6875rem] bg-secondary pt-[0.19rem] flex flex-col items-center translate-y-[100%] bottom-0 transition-all find-user absolute z-40' +
				(!!className ? ` ${className}` : '')
			}
		>
			<div className='w-[11rem] min-h-[2rem] bg-tertiary flex items-center relative mb-2'>
				<img className='w-[1.125rem] ml-3' src={searchIcon} alt='search-icon' />
				<input
					className='w-full h-full absolute inset-0 bg-transparent outline-none pl-[2.56rem] pr-1 text-[0.9375rem] text-[#FFF] font-secondary font-normal'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
			</div>
			<Scrollbar
				noDefaultStyles
				style={{ width: '11rem', height: '100%', marginBottom: '0.44rem' }}
			>
				<div className='w-[11rem] flex flex-col'>
					{users
						.filter(donate =>
							donate.username.toLowerCase().includes(searchQuery.toLowerCase())
						)
						.map(user => (
							<div className='min-w-full max-w-full h-4 flex items-center mb-[0.38rem] last-of-type:mb-0'>
								<button
									onClick={() => selectUser(user)}
									className={
										(selectedUsers.includes(user.username)
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
		</div>
	)
}

export default FindUser
