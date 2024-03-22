import { FC } from 'react'
import uniqueRoleBgImg from '@/assets/room/unique-role-editor.png'
import { useUserUniqueRoles } from '@/api/useUserUniqueRoles'

const UniqueRole: FC = () => {
	const { data: roles, isLoading, isError } = useUserUniqueRoles()
	
	return (
		<>
			<div className='w-full h-full relative flex justify-center items-center handle'>
				<img
					className='w-full h-full pointer-events-none'
					src={uniqueRoleBgImg}
					alt='unique-role'
				/>
				<div className='w-full h-full flex flex-col justify-center items-center absolute inset-0'>
					{isLoading ? (
						<p className='text-tertiary text-[1.4vw] leading-none text-center'>
							Загрузка...
						</p>
					) : isError ? (
						<p className='text-tertiary text-[1.4vw] leading-none text-center'>
							Ошибка
						</p>
					) : !roles.selected_unique_role_adjective &&
					  !roles.selected_unique_role_noun ? (
						<>
							<p className='text-tertiary text-[1.4vw] leading-none text-center pointer-events-none'>
								Роль не
							</p>
							<p className='text-tertiary text-[1.4vw] leading-none text-center pointer-events-none'>
								выбрана
							</p>
						</>
					) : (
						<>
							<p className='text-tertiary text-[1.4vw] leading-none text-center pointer-events-none'>
								{roles.selected_unique_role_adjective}
							</p>
							<p className='text-tertiary text-[1.4vw] leading-none text-center pointer-events-none'>
								{roles.selected_unique_role_noun}
							</p>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default UniqueRole
