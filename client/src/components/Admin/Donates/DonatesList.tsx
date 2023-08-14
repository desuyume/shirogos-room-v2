import { FC } from 'react'
import DonateItem from './DonateItem'
import { useDonates } from '@/hooks/useDonates'
import { Scrollbar } from 'react-scrollbars-custom'

interface IDonatesList {
	searchQuery: string
}

const DonatesList: FC<IDonatesList> = ({ searchQuery }) => {
	const { data: donates, isLoading, isError } = useDonates()

	return (
		<div className='ml-4 mt-[0.63rem] mb-[0.81rem] donates'>
			<div className='flex'>
				<div className='bg-tertiary h-[3.73rem] flex justify-center items-center w-[11.40625vw] mr-[0.8vw]'>
					<p className='text-xl text-[#FFF] text-center'>Никнейм</p>
				</div>
				<div className='bg-tertiary h-[3.73rem] flex justify-center items-center w-[7.65625vw] mr-[0.8vw]'>
					<p className='text-xl text-[#FFF] text-center'>Сумма</p>
				</div>
				<div className='bg-tertiary h-[3.73rem] flex justify-center items-center w-[7.65625vw] mr-[6.5vw]'>
					<p className='text-xl text-[#FFF] text-center'>Добавить</p>
				</div>
				<div className='bg-tertiary h-[3.73rem] flex justify-center items-center w-[37.03125vw]'>
					<p className='text-xl text-[#FFF] text-center'>Комментарий</p>
				</div>
			</div>
			{isLoading ? (
				<div className='min-h-[51.5625rem] max-h-[51.5625rem]'>
					<p>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='min-h-[51.5625rem] max-h-[51.5625rem]'>
					<p>Произошла ошибка</p>
				</div>
			) : donates.length ? (
				<Scrollbar noDefaultStyles style={{width: "80vw", height: "51.5625rem"}}>
					<div >
						{donates
							.filter(donate =>
								donate.username
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
							)
							.map(donate => (
								<DonateItem
									key={donate.id}
									id={donate.id}
									username={donate.username}
									amount={donate.amount}
									gifts={donate.gifts}
								/>
							))}
					</div>
				</Scrollbar>
			) : (
				<div className='min-h-[51.5625rem] max-h-[51.5625rem] pt-6 flex justify-center'>
					<p>Донатов нет :(</p>
				</div>
			)}
		</div>
	)
}

export default DonatesList
