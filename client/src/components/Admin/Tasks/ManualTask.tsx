import { FC } from 'react'

const ManualTask: FC = () => {
	return (
		<div className='w-[58.5vw] h-[10.5625rem]'>
			<div className='w-full h-[3.375rem] flex justify-center items-center bg-tertiary'>
				<h3 className='text-[1.5625rem] text-[#FFF]'>Ручное задание</h3>
			</div>
			<div className='h-[7.20rem] flex'>
				<input className='w-[60%] h-full bg-secondary text-xl outline-none text-[#B7B7B7] placeholder:text-[#B7B7B7] text-center' placeholder='Описание' />
				<button className='w-[15%] h-full bg-secondary hover:bg-secondaryHover text-[#B7B7B7] text-xl transition-all'>Награда</button>
				<button className='bg-primary text-[1.375rem] w-[25%] text-[#FFF] hover:bg-primaryHover transition-all'>Добавить</button>
			</div>
		</div>
	)
}

export default ManualTask
