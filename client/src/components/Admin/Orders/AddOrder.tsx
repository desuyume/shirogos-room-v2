import { useInputLimit } from '@/hooks/useInputLimit'
import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import { useOrderPrices } from '@/api/useOrderPrices'
import { isUrl } from '@/utils/isUrl'
import { useCreateOrderManually } from '@/api/useCreateOrderManually'
import { IFindUser } from '@/types/user.interface'

interface IAddOrder {
	index: number
}

const AddOrder: FC<IAddOrder> = ({ index }) => {
	const [orderText, setOrderText] = useState<string>('')
	const [selecetedTime, setSelecetedTime] = useState<number | null>(null)
	const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
	const { limit, setLimit, changeNameHandler, keyDownHandler } =
		useInputLimit(setOrderText)
	const [selectedUsers, setSelectedUsers] = useState<IFindUser[]>([])
	const [isVideo, setIsVideo] = useState<boolean>(false)

	const { data: prices, isLoading, isError } = useOrderPrices()
	const { mutate: createOrder, isSuccess } = useCreateOrderManually()

	const clickAddOrder = () => {
		if (!isVideo && (orderText.length > 34 || orderText.length < 3)) {
			console.log('length must be between 3 and 34')
			return
		}

		if (!!isVideo && !isUrl(orderText)) {
			console.log('video must be a url')
			return
		}

		if (!selectedUsers.length) {
			console.log('you must choose at least one user')
			return
		}

		if (!selecetedTime) {
			console.log('you must choose at least one price')
			return
		}

		createOrder({
			orderPriceId: selecetedTime,
			orderText,
			userId: selectedUsers[0].id,
		})
	}

	const changePriceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelecetedTime(+e.target.value)

		if (isVideo && orderText.length > 34) {
			setOrderText(orderText.slice(0, 34))
			setLimit(0)
		}

		if (+e.target.value === 4 || +e.target.value === 5) {
			setIsVideo(true)
		} else {
			setIsVideo(false)
		}
	}

	useEffect(() => {
		if (!isLoading && !isError) {
			setSelecetedTime(prices[0].id)
		}
	}, [isLoading])

	useEffect(() => {
		if (isSuccess) {
			setOrderText('')
			setSelectedUsers([])
			setLimit(34)
		}
	}, [isSuccess])

	return (
		<div className='w-full h-[3.25rem] flex items-center justify-between'>
			<div className='w-[76.2%] h-full flex [&>*]:h-full [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:text-[#FFF] [&>*]:font-secondary [&>*]:text-xl [&>*]:font-bold [&>*]:text-center bg-tertiary'>
				<p className='w-[6.59%]'>{index}</p>
				<div className='w-[25%] h-full relative'>
					<button
						onClick={() => setIsChooseUserVisible(!isChooseUserVisible)}
						className='w-full h-full hover:bg-secondary transition-all overflow-hidden'
					>
						{selectedUsers.length > 0
							? selectedUsers[0].userDisplayName
							: 'выбрать никнейм'}
					</button>
					<FindUser
						isVisible={isChooseUserVisible}
						className='absolute translate-y-[100%] -bottom-[0.42rem]'
						selectType='users'
						selectedUsers={selectedUsers}
						setSelectedUsers={setSelectedUsers}
					/>
				</div>
				<div className='flex-1 relative flex items-center'>
					<input
						value={orderText}
						onChange={e =>
							!!isVideo ? setOrderText(e.target.value) : changeNameHandler(e)
						}
						onKeyDown={e => !isVideo && keyDownHandler(e)}
						className='w-full bg-transparent outline-none text-center'
					/>
					{!isVideo && (
						<p className='absolute right-[0.44rem] text-primary text-sm z-10 pointer-events-none transition-all'>
							{limit}
						</p>
					)}
				</div>
				{isLoading ? (
					<p className='w-[20%] h-full bg-transparent'>Загрузка...</p>
				) : isError ? (
					<p className='w-[20%] h-full bg-transparent'>Ошибка</p>
				) : (
					<select
						defaultValue={prices[0].id}
						onChange={e => changePriceHandler(e)}
						className='w-[20%] bg-transparent hover:bg-secondary transition-all cursor-pointer outline-none'
					>
						{prices.map(price => (
							<option key={price.id} value={price.id}>
								{price.text}
							</option>
						))}
					</select>
				)}
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
