import { FC } from 'react'
import OnlineList from './OnlineList'
import AddOnlineOption from './AddOnlineOption'

const OnlineOptions: FC = () => {
	return (
		<div className='w-[49.26%] h-[26.0625rem] flex flex-col online-options-admin'>
			<div className='w-[72.68%] mb-[0.7rem]'>
				<p className='text-primaryText text-[2.1875rem] text-center leading-none'>Варианты</p>
				<p className='text-primaryText text-[0.9375rem] text-center leading-none'>для “случайного пользователя онлайн” на главной</p>
			</div>
			<OnlineList />
			<AddOnlineOption />
		</div>
	)
}

export default OnlineOptions