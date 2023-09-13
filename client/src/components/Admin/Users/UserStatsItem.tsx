import { FC, useState } from 'react'

interface IAddUserStat {
	initialValue?: number
	isDisabled?: boolean
	isBig?: boolean
	statTitle: string
	isSmallTitle?: boolean
}

const UserStatsItem: FC<IAddUserStat> = ({
	initialValue,
	isDisabled,
	isBig,
	statTitle,
	isSmallTitle,
}) => {
	const [value, setValue] = useState<string>("0")

	return (
		<div className={(isDisabled ? 'h-[2.6875rem] ' : 'h-[3.375rem] ') + 'flex'}>
			<div
				className={
					(isDisabled ? 'bg-opacity-50 ' : '') +
					'w-[9.75rem] h-full flex justify-center items-center bg-tertiary mr-[0.19rem] px-4'
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
					(isDisabled ? 'bg-opacity-50 ' : '') +
					(isBig ? 'w-[66rem] ' : 'w-[9.25rem] ') +
					'h-full flex justify-center items-center bg-secondary mr-[0.19rem]'
				}
			>
				{isDisabled ? (
					<p
						className={
							(isDisabled ? 'text-opacity-50 ' : '') +
							'text-[#FFF] text-xl text-center'
						}
					>
						{initialValue}
					</p>
				) : (
					<input
						value={value}
						onChange={e => setValue(e.target.value)}
						className='w-full h-full bg-transparent outline-none text-[#FFF] text-xl text-center'
					/>
				)}
			</div>
			<button
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
