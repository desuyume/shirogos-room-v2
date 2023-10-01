import { useUniqueRoles } from '@/api/useUniqueRoles'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import RolesItem from './RolesItem'

interface IRolesList {
	type: string
}

const RolesList: FC<IRolesList> = ({ type }) => {
	const { isLoading, data: roles, error } = useUniqueRoles(type)

	return isLoading ? (
		<div className='flex justify-center items-center max-h-[7rem] min-h-[7rem]'>
			<p>Загрузка...</p>
		</div>
	) : error ? (
		<div className='flex justify-center items-center max-h-[7rem] min-h-[7rem]'>
			<p>Произошла ошибка</p>
		</div>
	) : roles?.length ? (
		<Scrollbar noDefaultStyles style={{ height: '7rem' }}>
			<div className='pt-[0.31rem] flex flex-col items-center max-h-[7rem] min-h-[7rem]'>
				{roles.map(role => (
					<RolesItem
						key={role.id}
						id={role.id}
						title={role.title}
						type={type}
					/>
				))}
			</div>
		</Scrollbar>
	) : (
		<div className='flex justify-center items-center max-h-[7rem] min-h-[7rem]'>
			<p>Ролей нет :0</p>
		</div>
	)
}

export default RolesList
