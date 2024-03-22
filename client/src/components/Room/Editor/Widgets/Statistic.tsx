import { FC } from 'react'
import { useRoomStats } from '@/api/useRoomStats'

const Statistic: FC = () => {
	const { data: stats, isLoading, isError } = useRoomStats()

	return (
		<>
			<div className='w-full h-full relative flex flex-col items-center handle'>
				<div className='bg-tertiary w-[51.77%] aspect-[233.77/39] flex justify-center items-center rounded-[1.5625rem] my-[4.15%]'>
					<p className='text-primaryText leading-[97.8%] text-[1vw] pointer-events-none'>
						Статистика
					</p>
				</div>
				{isLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText text-center text-[0.73vw] leading-none'>
							Загрукза...
						</p>
					</div>
				) : isError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText text-center text-[0.73vw] leading-none'>
							Ошибка
						</p>
					</div>
				) : (
					<div className='w-full px-[3.1%] flex flex-col items-center [&>div]:mb-[1.278%] [&>div:last-of-type]:mb-0'>
						<div className='w-full aspect-[424/47] bg-tertiary bg-opacity-50 rounded-[1.5625rem] flex'>
							<div className='flex-1 h-full flex justify-center items-center'>
								<p className='text-primaryText text-center text-[0.73vw] leading-none pointer-events-none'>
									Открыто картинок в Паноптикуме
								</p>
							</div>
							<div className='h-full aspect-[86.05/47] bg-[#8CAFB1] rounded-[1.5625rem] flex justify-center items-center pointer-events-none'>
								<p className='text-primaryText text-center text-[0.65vw]'>
									{stats.panopticons_count}
								</p>
							</div>
						</div>
						<div className='w-full aspect-[424/47] bg-tertiary bg-opacity-50 rounded-[1.5625rem] flex'>
							<div className='flex-1 h-full flex justify-center items-center'>
								<p className='text-primaryText text-center text-[0.73vw] leading-none pointer-events-none'>
									Сделано клипов для Нарезок
								</p>
							</div>
							<div className='h-full aspect-[86.05/47] bg-[#67B8BD] rounded-[1.5625rem] flex justify-center items-center'>
								<p className='text-primaryText text-center text-[0.65vw] pointer-events-none'>
									{stats.clips}
								</p>
							</div>
						</div>
						<div className='w-full aspect-[424/47] bg-tertiary bg-opacity-50 rounded-[1.5625rem] flex'>
							<div className='flex-1 h-full flex justify-center items-center'>
								<p className='text-primaryText text-center text-[0.73vw] leading-none pointer-events-none'>
									Игр заказано
								</p>
							</div>
							<div className='h-full aspect-[86.05/47] bg-[#7FB5B8] rounded-[1.5625rem] flex justify-center items-center'>
								<p className='text-primaryText text-center text-[0.65vw] pointer-events-none'>
									{stats.games_ordered}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Statistic
