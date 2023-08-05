import { FC, useEffect, useState } from 'react'

interface IManualTaskItem {
	index: number
	description: string
	currentQueue: number | null
	setCurrentQueue: React.Dispatch<React.SetStateAction<number | null>>
}

const ManualTaskItem: FC<IManualTaskItem> = ({
	index,
	description,
	currentQueue,
	setCurrentQueue,
}) => {
	const [isActive, setIsActive] = useState<boolean>(false)

	const clickQueue = () => {
		if (isActive) {
			setCurrentQueue(null)
			setIsActive(false)
		} else {
			setCurrentQueue(index)
			setIsActive(true)
		}
	}

	useEffect(() => {
		if (currentQueue !== index) {
			setIsActive(false)
		}
	}, [currentQueue])

	return (
		<div className='h-[3.25rem] flex items-center'>
			<p className='w-[5%] text-[#B7B7B7] text-xl text-center bg-secondary h-full flex justify-center items-center'>
				#{index}
			</p>
			<p className='w-[50%] text-[#B7B7B7] text-xl text-center h-full bg-secondary flex justify-center items-center'>
				{description}
			</p>
			<div className='bg-secondary h-full w-[20%] flex items-center'>
				<button className='bg-primary hover:bg-primaryHover transition-all w-full h-[2.5625rem] text-[#FFF]'>
					Удалить
				</button>
			</div>
			<button
				onClick={clickQueue}
				className={
					(isActive ? 'bg-[#FFF] text-tertiary' : 'text-[#FFF] bg-tertiary') +
					' ml-[1%] w-[24%] h-[2.5625rem] hover:bg-[#FFF] hover:text-tertiary transition-all'
				}
			>
				Очередь
			</button>
		</div>
	)
}

export default ManualTaskItem
