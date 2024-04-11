import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { usePanopticons } from '@/api/usePanopticons'
import PanopticonItem from './PanopticonItem'

const PanopticonSection: FC = () => {
	const { data: panopticons, isLoading, isError } = usePanopticons()

	return (
		<div className='w-[83.44rem] h-[50.25rem] bg-secondary panopticons-admin'>
			<div className='w-full h-11 bg-tertiary flex items-center pr-[6%]'>
				<div className='w-[12.3%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Продаем?</p>
				</div>
				<div className='w-[15%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Цена, до</p>
				</div>
				<div className='w-[18%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Название</p>
				</div>
				<div className='flex-1 h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Описание</p>
				</div>
				<div className='w-[20%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Файл</p>
				</div>
			</div>
			<Scrollbar
				noDefaultStyles
				className='w-[91.1875rem]'
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
						{panopticons.map(panopticon => (
							<PanopticonItem key={panopticon.id} panopticon={panopticon} />
						))}
						<PanopticonItem isNew />
					</>
				)}
			</Scrollbar>
		</div>
	)
}

export default PanopticonSection
