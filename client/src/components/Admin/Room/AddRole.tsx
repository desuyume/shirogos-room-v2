import { FC, useState } from 'react'

const AddRole: FC = () => {
	const [role, setRole] = useState<string>('')

	return (
		<div className='flex h-5'>
			<input
				value={role}
				onChange={e => setRole(e.target.value)}
				className='bg-tertiary text-[#FFF] text-[0.625rem] outline-none text-center w-[70%] h-full'
			/>
			<button className='bg-primary hover:bg-primaryHover transition-all text-[#FFF] w-[30%] h-full text-[0.625rem]'>
				Добавить
			</button>
		</div>
	)
}

export default AddRole
