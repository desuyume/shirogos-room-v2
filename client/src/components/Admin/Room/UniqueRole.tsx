import { FC } from 'react'
import RolesList from './RolesList'
import AddRole from './AddRole'

interface IUniqueRole { 
	title: string
	type: string
}

const UniqueRole: FC<IUniqueRole> = ({ type, title }) => {
	return (
		<div className='w-1/2 bg-secondary'>
			<p className='text-[#FFF] font-secondary font-bold text-xl text-center py-[0.26rem]'>{title}</p>
			<hr className={(type === 'adjectives' ? 'ml-auto' : 'mr-auto') + ' border-primary border-t-2 w-[95%]'} />
			<RolesList type={type} />
			<AddRole type={type} />
		</div>
	)
}

export default UniqueRole