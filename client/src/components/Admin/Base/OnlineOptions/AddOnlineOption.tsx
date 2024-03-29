import { useCreateOnlineOption } from '@/api/useCreateOnlineOption'
import { FC, useEffect, useState } from 'react'

const AddOnlineOption: FC = () => {
	const [title, setTitle] = useState<string>('')
	const { mutate, isSuccess } = useCreateOnlineOption()

	const clickAdd = () => {
		mutate({ title })
	}

	useEffect(() => {
		if (isSuccess) {
			setTitle('')
		}
	}, [isSuccess])

	return (
		<div className='w-full flex-1 flex justify-between'>
			<div className='w-[72.68%] h-full bg-tertiary flex justify-center items-center'>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='w-full h-full bg-transparent outline-none text-primaryText text-xl text-center'
				/>
			</div>
			<button onClick={clickAdd} className='w-[25.95%] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-xl'>
				Добавить
			</button>
		</div>
	)
}

export default AddOnlineOption
