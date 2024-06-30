import { useCreateManualTask } from '@/api/useCreateManualTask'
import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

const ManualTask: FC = () => {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [dos, setDos] = useState<string>('')
	const [exp, setExp] = useState<string>('')

	const { mutate: create } = useCreateManualTask()

	const handleClickAdd = () => {
		if (!title) {
			console.log('title is required')
			return
		}
		if (!!dos && !isNumber(dos)) {
			console.log('dos must be a number')
			return
		}
		if (!!exp && !isNumber(exp)) {
			console.log('exp must be a number')
			return
		}
		create({
			title,
			description: description ?? null,
			do: +dos ?? null,
			exp: +exp ?? null,
		})
		clearFields()
	}

	const clearFields = () => {
		setTitle('')
		setDescription('')
		setDos('')
		setExp('')
	}

	return (
		<div className='w-[58.5vw] h-[10.5625rem]'>
			<div className='w-full h-[3.375rem] flex justify-center items-center bg-tertiary'>
				<h3 className='text-[1.5625rem] text-[#FFF]'>Ручное задание</h3>
			</div>
			<div className='h-[7.20rem] flex'>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='w-[30%] h-full bg-secondary text-xl outline-none text-[#B7B7B7] placeholder:text-[#B7B7B7] text-center px-2'
					placeholder='Название'
				/>
				<input
					value={description}
					onChange={e => setDescription(e.target.value)}
					className='w-[25%] h-full bg-secondary text-xl outline-none text-[#B7B7B7] placeholder:text-[#B7B7B7] text-center px-2'
					placeholder='Описание'
				/>
				<input
					value={dos}
					onChange={e => setDos(e.target.value)}
					className='w-[12.5%] h-full bg-secondary text-xl outline-none text-[#B7B7B7] placeholder:text-[#B7B7B7] text-center px-2'
					placeholder='ДО'
				/>
				<input
					value={exp}
					onChange={e => setExp(e.target.value)}
					className='w-[12.5%] h-full bg-secondary text-xl outline-none text-[#B7B7B7] placeholder:text-[#B7B7B7] text-center px-2'
					placeholder='Опыт'
				/>
				<button
					onClick={handleClickAdd}
					className='bg-primary text-[1.375rem] w-[20%] text-[#FFF] hover:bg-primaryHover transition-all'
				>
					Добавить
				</button>
			</div>
		</div>
	)
}

export default ManualTask
