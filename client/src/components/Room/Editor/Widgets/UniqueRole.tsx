import { FC } from 'react'
import uniqueRoleBgImg from '@/assets/room/unique-role-editor.png'
import { useUserUniqueRoles } from '@/api/useUserUniqueRoles'
import { IUserUniqueRoles } from '@/types/room.interface'

interface IUniqueRole {
	isGuide?: boolean
	guideUniqueRoles?: IUserUniqueRoles
}

const UniqueRole: FC<IUniqueRole> = ({ isGuide, guideUniqueRoles }) => {
	const { data: roles, isLoading, isError } = useUserUniqueRoles(!isGuide)

	return (
		<>
			<div className='w-full h-full relative flex justify-center items-center handle'>
				<img
					className='w-full h-full pointer-events-none'
					src={uniqueRoleBgImg}
					alt='unique-role'
				/>
				<div className='w-full h-full flex flex-col justify-center items-center absolute inset-0'>
					{isLoading && !isGuide ? (
						<p className='text-tertiary text-[1.4vw] leading-none text-center'>
							Загрузка...
						</p>
					) : isError && !isGuide ? (
						<p className='text-tertiary text-[1.4vw] leading-none text-center'>
							Ошибка
						</p>
					) : (
						<>
							<p className='text-tertiary text-[1.4vw] leading-none text-center pointer-events-none'>
								{isGuide && guideUniqueRoles?.selected_unique_role_adjective
									? guideUniqueRoles.selected_unique_role_adjective
									: !isGuide && roles?.selected_unique_role_adjective
									? roles.selected_unique_role_adjective
									: 'Роль не'}
							</p>
							<p className='text-tertiary text-[1.4vw] leading-none text-center pointer-events-none'>
								{isGuide && guideUniqueRoles?.selected_unique_role_noun
									? guideUniqueRoles.selected_unique_role_noun
									: !isGuide && roles?.selected_unique_role_noun
									? roles.selected_unique_role_noun
									: 'выбрана'}
							</p>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default UniqueRole
