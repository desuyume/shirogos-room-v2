import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { FC } from 'react'
import '@/styles/date-picker.scss'
import 'dayjs/locale/ru'
import { useUpdateBirthday } from '@/api/useUpdateBirthday'

interface IChangeBirthday {
	initialValue: Date | null
	value: Date | null
	setValue: React.Dispatch<React.SetStateAction<Date | null>>
}

const ChangeBirthday: FC<IChangeBirthday> = ({
	initialValue,
	value,
	setValue,
}) => {
	const { mutate } = useUpdateBirthday()

	const updateBirthday = () => {
		mutate({ birthday: value })
	}

	const isDatesEqual = (): boolean => {
		if (!!initialValue && !!value) {
			const initialDate = new Date(initialValue)
			return initialDate.toDateString() === value.toDateString()
		}
		return true
	}

	return (
		<div className='h-[7.75rem] flex justify-between items-center border-b-[1px] border-[#646464]'>
			<div className='flex flex-1 flex-col justify-center items-center'>
				<h3 className='text-[1.875rem] leading-[97.795%] text-[#FFF] mb-5'>
					День рождения
				</h3>
				<DatesProvider
					settings={{
						locale: 'ru',
					}}
				>
					<DatePickerInput
						className='bg-transparent w-[11.6875rem] border-b-[0.1875rem] border-primary hover:border-primaryHover transition-all'
						value={value}
						onChange={setValue}
						hideWeekdays
						placeholder='не указано'
					/>
				</DatesProvider>
			</div>
			<button
				disabled={isDatesEqual()}
				className='w-[8rem] h-[85%] bg-primary hover:bg-primaryHover transition-all text-primaryText text-[0.9375rem] mr-[2.73rem] disabled:bg-secondaryHover'
				onClick={updateBirthday}
			>
				Сохранить
			</button>
		</div>
	)
}

export default ChangeBirthday
