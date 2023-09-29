import { useDeleteOnlineOption } from '@/hooks/useDeleteOnlineOption'
import { FC } from 'react'

interface IOnlineOption {
	id: number
	title: string
}

const OnlineOption: FC<IOnlineOption> = ({ id, title }) => {
	const { mutate } = useDeleteOnlineOption(id)

	const handleDeleteOption = () => {
		mutate()
	}

	return (
		<div
			key={id}
			className='w-full h-[2.0625rem] flex justify-between mb-[0.7rem] last-of-type:mb-0'
		>
			<div className='w-[72.68%] h-full bg-tertiary flex justify-center items-center'>
				<p className='text-primaryText text-xl text-center'>Онлайн: {title}</p>
			</div>
			<button
				onClick={handleDeleteOption}
				className='w-[25.95%] h-full bg-tertiary text-[#FFF] text-xl hover:bg-opacity-80 transition-all'
			>
				Удалить
			</button>
		</div>
	)
}

export default OnlineOption
