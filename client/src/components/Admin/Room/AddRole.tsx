import { useCreateRole } from '@/hooks/useCreateRole'
import { FC, useEffect, useState } from 'react'

interface IAddRole {
	type: string
}

const AddRole: FC<IAddRole> = ({ type }) => {
	const { mutate, data, isSuccess } = useCreateRole(type)
	const [title, setTitle] = useState<string>('')

	useEffect(() => {
		if (isSuccess) {
			setTitle('')
		}
	}, [data])

	const addRoleHandler = () => {
		mutate({ title, type })
	}

	return (
		<div className='flex h-5'>
			<input
				value={title}
				onChange={e => setTitle(e.target.value)}
				className='bg-tertiary text-[#FFF] text-[0.625rem] outline-none text-center w-[70%] h-full'
			/>
			<button
				onClick={addRoleHandler}
				className='bg-primary hover:bg-primaryHover transition-all text-[#FFF] w-[30%] h-full text-[0.625rem]'
			>
				Добавить
			</button>
		</div>
	)
}

export default AddRole
