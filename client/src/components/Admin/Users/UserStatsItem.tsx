import { useAddUserStats } from '@/api/useAddUserStats'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'

interface IUserStatsItem {
	initialValue?: number
	isDisabled?: boolean
	isBig?: boolean
	statTitle: string
	isSmallTitle?: boolean
	userId?: number
	type: string
}

const UserStatsItem: FC<IUserStatsItem> = ({
	initialValue,
	isDisabled,
	isBig,
	statTitle,
	isSmallTitle,
	userId,
	type,
}) => {
	const [value, setValue] = useState<string>('0')
	const { mutate, isSuccess } = useAddUserStats(userId ?? null, type)

	const clickAdd = () => {
		if (isNumber(value)) {
			mutate({ value: +value })
		} else {
			console.log('value must be number')
		}
	}

	useEffect(() => {
		if (isSuccess) {
			setValue('0')
		}
	}, [isSuccess])

	return (
		<div className={(isDisabled ? 'h-[2.6875rem] ' : 'h-[3.375rem] ') + 'flex'}>
			<div
				className={
					(isDisabled ? 'bg-opacity-50 ' : '') +
					(isBig || isDisabled ? 'w-[9.75rem] ' : 'w-[5.0625rem] ') +
					'h-full flex justify-center items-center bg-tertiary mr-[0.19rem] px-4'
				}
			>
				<p
					className={
						(isDisabled ? 'text-opacity-50 ' : '') +
						(isSmallTitle ? 'text-xs ' : 'text-[0.9375rem] ') +
						'text-[#FFF] text-center leading-none'
					}
				>
					{statTitle}
				</p>
			</div>
			<div
				className={
					(isDisabled ? 'hidden ' : 'block ') +
					(isBig ? 'w-[43.875rem] ' : 'w-[9.25rem] ') +
					'h-full bg-secondary mr-[0.19rem]'
				}
			>
				<input
					value={value}
					onChange={e => setValue(e.target.value)}
					className='w-full h-full bg-transparent outline-none text-[#FFF] text-xl text-center'
				/>
			</div>
			<div
				className={
					(isDisabled ? 'bg-opacity-50 w-[9.25rem] ' : 'mr-[0.19rem] ') +
					(isBig ? 'w-[21.9375rem] ' : '') +
					(!isDisabled && !isBig ? 'w-[5.75rem] ' : '') +
					'h-full flex justify-center items-center bg-secondary'
				}
			>
				<p className='text-[#FFF] text-xl text-center text-opacity-50'>
					{initialValue ?? '0'}
				</p>
			</div>
			<button
				onClick={clickAdd}
				className={
					(isDisabled ? 'opacity-0 invisible ' : 'opacity-100 visible ') +
					'w-[6.0625rem] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem]'
				}
			>
				Добавить
			</button>
		</div>
	)
}

export default UserStatsItem
