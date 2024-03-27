import { FC, useEffect, useState } from 'react'
import { abbrMonths, months } from '@/consts/months.ts'
import cakeImg from '@/assets/cake.png'
import noBirthdayCakeImg from '@/assets/black-gray-cake.png'
import AlmanacSwitchBttn from './AlmanacSwitchBttn.tsx'
import { useCurrentBirthdays } from '@/api/useCurrentBirthdays.ts'
import useDate from '@/hooks/useDate.ts'

const Almanac: FC = () => {
	const {
		currentDate,
		setCurrentDate,
		prevDate,
		setPrevDate,
		nextDate,
		setNextDate,
	} = useDate(new Date())
	const {
		data: birthdays,
		isFetching,
		isError,
	} = useCurrentBirthdays(currentDate)
	const [usernames, setUsernames] = useState<string[]>([])

	const clickPrevBttn = () => {
		setNextDate(currentDate)
		setCurrentDate(prevDate)
		setPrevDate(
			new Date(
				prevDate.getFullYear(),
				prevDate.getMonth(),
				prevDate.getDate() - 1
			)
		)
	}

	const clickNextBttn = () => {
		setPrevDate(currentDate)
		setCurrentDate(nextDate)
		setNextDate(
			new Date(
				nextDate.getFullYear(),
				nextDate.getMonth(),
				nextDate.getDate() + 1
			)
		)
	}

	useEffect(() => {
		if (!isFetching && !isError && !!birthdays) {
			setUsernames(birthdays.map(birthday => birthday.username))
		}
	}, [isFetching])

	return (
		<div
			className='w-[31.875rem] h-[17.1875rem] rounded-[2.3125rem] flex justify-between items-center py-3.5 px-3'
			style={{
				background:
					'linear-gradient(137deg, rgba(23, 23, 23, 0.20) 0%, rgba(36, 36, 36, 0.20) 46.88%), rgba(24, 24, 24, 0.40)',
			}}
		>
			<AlmanacSwitchBttn
				onClick={clickPrevBttn}
				date={prevDate.getDate()}
				month={abbrMonths[prevDate.getMonth() as keyof typeof months]}
			/>
			<div className='h-full flex flex-col items-center mt-[1.875rem]'>
				<div className='text-center mb-6'>
					<p className='text-[#EBE984] text-2xl leading-none mb-1'>
						{currentDate.getDate()}{' '}
						{months[currentDate.getMonth() as keyof typeof months]}
					</p>
					<p className='text-primaryText text-[2.5rem] leading-none'>
						Альманах
					</p>
				</div>
				{
					<div className='flex justify-center items-center'>
						{!!birthdays?.length ? (
							<>
								<img src={cakeImg} alt='cake-img' className='mr-[1.375rem]' />
								<div className='flex flex-col items-center max-w-[11.8125rem] w-[11.8125rem] pt-2.5'>
									<p className='text-[#EBE984] text-[1.0625rem] font-bold font-secondary text-center'>
										С Днем Рождения<span className='text-primaryText'>,</span>
									</p>
									<p className='text-primaryText text-[1.0625rem] font-bold font-secondary text-center max-h-[6.375rem] overflow-y-auto max-w-full break-words'>
										{usernames?.join(', ')}!
									</p>
								</div>
							</>
						) : (
							<>
								<img
									src={noBirthdayCakeImg}
									alt='cake-img'
									className='mr-[1.375rem]'
								/>
								<p className='text-[1.0625rem] text-primaryText text-center w-[11.8125rem] leading-none pt-2.5'>
									Сегодня нет
									<span className='text-[#EBE984] inline-block mb-1'>
										Дней Рождений
									</span>
									!
									<span className='text-[0.625rem] inline-block leading-none'>
										(или его не указали в настройках)
									</span>
								</p>
							</>
						)}
					</div>
				}
			</div>
			<AlmanacSwitchBttn
				onClick={clickNextBttn}
				date={nextDate.getDate()}
				month={abbrMonths[nextDate.getMonth() as keyof typeof months]}
			/>
		</div>
	)
}

export default Almanac
