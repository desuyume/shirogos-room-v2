import { FC } from 'react'

const TaskQueueItem: FC = () => {
	return (
		<div className='h-[7.1875rem] flex'>
			<p className='w-[35%] h-full flex justify-center items-center text-[#FFF] text-xl'>mercenaryJulian</p>
			<div className='w-[30%] h-full flex justify-center items-center'>
				<div className='bg-[#D9D9D9] w-[70%] h-[4.625rem]' />
			</div>
			<button className='w-[35%] h-full text-[1.375rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF]'>Подтвердить</button>
		</div>
	)
}

export default TaskQueueItem