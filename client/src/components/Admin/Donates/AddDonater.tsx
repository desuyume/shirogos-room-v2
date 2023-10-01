import { DONATES_KEY } from '@/consts/queryKeys'
import { useCreateDonate } from '@/api/useCreateDonate'
import { isNumber } from '@/utils/isNumber'
import { useQueryClient } from '@tanstack/react-query'
import { FC, SyntheticEvent, useEffect, useState } from 'react'

const AddDonater: FC = () => {
	const { mutate, data, isSuccess } = useCreateDonate()
	const queryCluent = useQueryClient()

	const [username, setUsername] = useState<string>('')
	const [amount, setAmount] = useState<string>('')
	const [gifts, setGifts] = useState<string>('')

	const addDonater = (e: SyntheticEvent) => {
		e.preventDefault()
		if (!isNumber(amount)) {
			console.log('amount must be number')
		} else if (username === '') {
			console.log('username field can not be blank')
		} else {
			const donate = {
				username,
				amount: +amount,
				gifts
			}
			mutate(donate)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			queryCluent.invalidateQueries([DONATES_KEY])
			setUsername('')
			setAmount('')
			setGifts('')
		}
	}, [data])

	return (
		<form className='h-[3.125rem] flex ml-4 pb-[0.87rem]'>
			<input
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder='Ник'
				className='text-xl w-[11.40625vw] mr-[0.8vw] h-full bg-tertiary outline-none text-[#FFF] text-center'
				required
			/>
			<input
				value={amount}
				onChange={e => setAmount(e.target.value)}
				placeholder='Сумма'
				className='text-xl w-[16.1125vw] mr-[6.5vw] h-full bg-tertiary outline-none text-[#FFF] text-center'
				required
			/>
			<input
				value={gifts}
				onChange={e => setGifts(e.target.value)}
				placeholder='Комментарий'
				className='text-xl w-[37.03125vw] h-full bg-tertiary outline-none text-[#FFF] text-center mr-[0.78125vw]'
			/>
			<button
				onClick={e => addDonater(e)}
				className='w-[13.59375vw] h-full bg-primary hover:bg-primaryHover transition-all text-xl text-[#FFF]'
			>
				Добавить
			</button>
		</form>
	)
}

export default AddDonater
