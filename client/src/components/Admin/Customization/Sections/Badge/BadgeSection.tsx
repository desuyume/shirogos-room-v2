import { FC } from 'react'
import BadgeItem from './BadgeItem'
import { useBadge } from '@/api/useBadge'
import { Scrollbar } from 'react-scrollbars-custom'

const BadgeSection: FC = () => {
	const { data: badges, isLoading, isError } = useBadge()

	return (
		<div className='w-[68.06rem] h-[50.25rem] bg-secondary badges-admin'>
			<div className='w-full h-11 bg-tertiary flex items-center pr-[7%]'>
				<div className='w-[17.5%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Тип значка</p>
				</div>
				<div className='w-[13%] h-full flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Продаем?</p>
				</div>
				<div className='w-[25%] h-full flex justify-center items-center'>
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
				className='w-[75.8125rem]'
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
						{badges.map(badge => (
							<BadgeItem key={badge.id} badge={badge} />
						))}
						<BadgeItem isNew />
					</>
				)}
			</Scrollbar>
		</div>
	)
}

export default BadgeSection
