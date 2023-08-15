import { useDeleteUniqueRole } from '@/hooks/useDeleteUniqueRole'
import { FC } from 'react'

interface IRolesItem {
	id: number
	title: string
	type: string
}

const RolesItem: FC<IRolesItem> = ({ id, title, type }) => {
	const { mutate } = useDeleteUniqueRole(type)

	const handleDeleteRole = () => {
		mutate(id)
	}

	return (
		<div className='mb-[0.3rem] last-of-type:mb-0 relative flex justify-center items-center w-full'>
			<p className='text-[#FFF] font-secondary font-bold text-[0.9375rem] last-of-type:pb-[0.31rem]'>
				{title}
			</p>
			<button onClick={handleDeleteRole} className='absolute left-5'>-</button>
		</div>
	)
}

export default RolesItem
