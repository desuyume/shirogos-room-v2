import { FC } from 'react'

interface IRoleAward {
	selectedAwardType: string | null
	roleType: string
	setRoleType: React.Dispatch<React.SetStateAction<string>>
	role: string
	setRole: React.Dispatch<React.SetStateAction<string>>
}

const RoleAward: FC<IRoleAward> = ({
	selectedAwardType,
	roleType,
	setRoleType,
	role,
	setRole,
}) => {
	return (
		<div
			className={
				(selectedAwardType === 'unique-role' ? 'block ' : 'hidden ') +
				'w-full flex-1 flex flex-col justify-center items-center transition-all relative'
			}
		>
			<div className='w-full py-3 flex'>
				<div className='w-1/2 flex justify-center'>
					<input
						className='mr-2'
						type='radio'
						id='noun'
						name='role-type'
						value='noun'
						checked={roleType === 'noun'}
						onChange={e => setRoleType(e.target.value)}
					/>
					<label
						className='text-[#FFF] font-secondary font-normal'
						htmlFor='noun'
					>
						Сущ
					</label>
				</div>
				<div className='w-1/2 flex justify-center'>
					<input
						className='mr-2'
						type='radio'
						id='adjective'
						name='role-type'
						value='adjective'
						checked={roleType === 'adjective'}
						onChange={e => setRoleType(e.target.value)}
					/>
					<label
						className='text-[#FFF] font-secondary font-normal'
						htmlFor='adjective'
					>
						Прил
					</label>
				</div>
			</div>
			<div className='flex-1 w-full px-5'>
				<input
					value={role}
					onChange={e => setRole(e.target.value)}
					className='bg-transparent border-b-[1px] border-b-primary w-full outline-none h-8 text-[#FFF] font-secondary text-center'
				/>
			</div>
		</div>
	)
}

export default RoleAward
