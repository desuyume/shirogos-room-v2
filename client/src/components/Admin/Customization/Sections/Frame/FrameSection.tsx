import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import FrameItem from './FrameItem'
import { useFrames } from '@/api/useFrames'

const FrameSection: FC = () => {
	const { data: frames, isLoading, isError } = useFrames()

	return (
		<div className='w-[56.81rem] h-[50.25rem] bg-secondary frames-admin'>
			<div className='w-full h-11 bg-tertiary flex items-center pr-[6%]'>
				<div className='w-[18%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Продаем?</p>
				</div>
				<div className='w-[21.7%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Цена, до</p>
				</div>
				<div className='flex-1 h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Название</p>
				</div>
				<div className='w-[12%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Файл</p>
				</div>
			</div>
			<Scrollbar
				noDefaultStyles
				className='w-[64.5625rem]'
				style={{ height: '47.5rem' }}
			>
				{isLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Загрузка...</p>
					</div>
				) : isError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Ошибка</p>
					</div>
				) : (
					<>
						{frames.map(frame => (
							<FrameItem key={frame.id} frame={frame} />
						))}
						<FrameItem isNew />
					</>
				)}
			</Scrollbar>
		</div>
	)
}

export default FrameSection
