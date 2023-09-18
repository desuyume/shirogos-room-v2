import { useInputLimit } from '@/hooks/useInputLimit'
import { FC, useState } from 'react'
import FindUser from '../FindUser'

interface IAddOrder {
	index: number
}

const AddOrder: FC<IAddOrder> = ({ index }) => {
	const [orderText, setOrderText] = useState<string>('')
	const [selecetedTime, setSelecetedTime] = useState<string>('1h')
	const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
	const { limit, changeNameHandler, keyDownHandler } =
		useInputLimit(setOrderText)
	const [selectedUsers, setSelectedUsers] = useState<string[]>([])

	const orderTimes = [
		{ time: '1 час', type: '1h' },
		{ time: '2 часа', type: '2h' },
		{ time: '3 часа', type: '3h' },
	]

	const clickAddOrder = () => {
		console.log(index)
		console.log(orderText)
		console.log(selecetedTime)
		console.log(selectedUsers[0])
	}

	return (
		<div className='w-full h-[3.25rem] flex items-center justify-between'>
			<div className='w-[76.2%] h-full flex [&>*]:h-full [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:text-[#FFF] [&>*]:font-secondary [&>*]:text-xl [&>*]:font-bold [&>*]:text-center bg-tertiary'>
				<p className='w-[6.59%]'>{index}</p>
				<div className='w-[25%] h-full relative'>
					<button onClick={() => setIsChooseUserVisible(!isChooseUserVisible)} className='w-full h-full hover:bg-secondary transition-all overflow-hidden'>
						{selectedUsers.length > 0 ? selectedUsers.join(', ') : 'выбрать никнейм'}
					</button>
					<FindUser isVisible={isChooseUserVisible} className='absolute translate-y-[100%] -bottom-[0.42rem]' selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
				</div>
				<div className='flex-1 relative flex items-center'>
					<input
						value={orderText}
						onChange={e => changeNameHandler(e)}
						onKeyDown={e => keyDownHandler(e)}
						className='w-full bg-transparent outline-none text-center'
					/>
					<p className='absolute right-[0.44rem] text-primary text-sm z-10 pointer-events-none transition-all'>
						{limit}
					</p>
				</div>
				<select
					onChange={e => setSelecetedTime(e.target.value)}
					className='w-[23.8%] bg-transparent hover:bg-secondary transition-all cursor-pointer outline-none'
				>
					{orderTimes.map(time => (
						<option key={time.type} value={time.type}>
							{time.time}
						</option>
					))}
				</select>
			</div>
			<button
				onClick={clickAddOrder}
				className='w-[11.5%] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-xl'
			>
				Добавить
			</button>
			<div className='w-[11.5%] h-full bg-transparent' />
		</div>
	)
}

export default AddOrder
