import { FC } from 'react'
import DonateItem from './DonateItem'

const DonatesList: FC = () => {
	return (
		<div className='ml-4 mt-[0.63rem] mb-[0.81rem]'>
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
			<div className='min-h-[51.5625rem] max-h-[51.5625rem] overflow-y-auto'>
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
				<DonateItem />
			</div>
		</div>
	)
}

export default DonatesList
