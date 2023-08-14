import { useDeleteDonate } from '@/hooks/useDeleteDonate'
import { useUpdateDonateAmount } from '@/hooks/useUpdateDonateAmount'
import { useUpdateDonateGifts } from '@/hooks/useUpdateDonateGifts'
import { IDonate } from '@/types/donate.interface'
import { formatMoney } from '@/utils/formatMoney'
import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

const DonateItem: FC<IDonate> = ({ id, username, amount, gifts }) => {
	const { mutate: mutateDonate } = useUpdateDonateAmount(id)
	const { mutate: mutateGifts } = useUpdateDonateGifts(id)
	const { mutate: mutateDelete } = useDeleteDonate(id)

	const [addAmount, setAddAmount] = useState<string>('')
	const [resAmount, setResAmount] = useState<number>(amount ? +amount : 0)
	const [giftsValue, setGiftsValue] = useState<string>(!!gifts ? gifts : '')

	const updateAmountHandler = () => {
		if (!isNumber(addAmount)) {
			console.log('addAmount must be number')
		} else {
			mutateDonate({ id, addAmount })
			setResAmount(prev => prev + +addAmount)
			setAddAmount('')
		}
	}

	const updateGiftsHandler = () => {
		mutateGifts({ id, gifts: giftsValue })
	}

	const deleteDonateHandler = () => {
		mutateDelete(id)
	}

	return (
		<div className='flex items-center'>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[11.40625vw] mr-[0.8vw]'>
				<p className='text-xl text-[#FFF] text-center'>{username}</p>
			</div>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[7.65625vw] mr-[0.8vw]'>
				<p className='text-xl text-[#FFF] text-center'>{formatMoney(resAmount)}р</p>
			</div>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[7.65625vw] mr-[0.7vw]'>
				<input
					value={addAmount}
					onChange={e => setAddAmount(e.target.value)}
					className='text-xl bg-tertiary w-full h-full outline-none text-[#FFF] text-center'
				/>
			</div>
			<button
				onClick={updateAmountHandler}
				className='bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem] mr-[0.7vw] min-w-[5.1vw] max-w-[5.1vw] h-[2.5rem]'
			>
				Добавить
			</button>
			<div className='bg-tertiary h-[3.16rem] flex justify-center items-center w-[37.03125vw] mr-[0.7vw]'>
				<input
					value={giftsValue}
					onChange={e => setGiftsValue(e.target.value)}
					onBlur={updateGiftsHandler}
					className='text-xl bg-tertiary w-full h-full outline-none text-[#FFF] text-center'
				/>
			</div>
			<button
				onClick={deleteDonateHandler}
				className='bg-tertiary hover:bg-secondary transition-all text-[#FFF] text-[0.9375rem] min-w-[5.1vw] max-w-[5.1vw] h-[2.5rem]'
			>
				Удалить
			</button>
		</div>
	)
}

export default DonateItem
