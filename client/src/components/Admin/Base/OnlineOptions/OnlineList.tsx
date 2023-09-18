import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const OnlineList: FC = () => {
	const items = [
		{ id: 1, text: 'Онлайн: Широго' },
		{ id: 2, text: 'Онлайн: Курого' },
		{ id: 3, text: 'Онлайн: трусы Мерка!' },
	]

	return (
		<Scrollbar
			noDefaultStyles
			className='bg-secondary'
			style={{ height: '20.06rem', minHeight: '20.06rem' }}
		>
			{items.map(item => (
				<div
					key={item.id}
					className='w-full h-[2.0625rem] flex justify-between mb-[0.7rem] last-of-type:mb-0'
				>
					<div className='w-[72.68%] h-full bg-tertiary flex justify-center items-center'>
						<p className='text-primaryText text-xl text-center'>{item.text}</p>
					</div>
					<button className='w-[25.95%] h-full bg-tertiary text-[#FFF] text-xl hover:bg-opacity-80 transition-all'>
						Удалить
					</button>
				</div>
			))}
		</Scrollbar>
	)
}

export default OnlineList
