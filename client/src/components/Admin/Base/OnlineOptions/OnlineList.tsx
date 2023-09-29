import { useOnlineOption } from '@/hooks/useOnlineOption'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import OnlineOption from './OnlineOption'

const OnlineList: FC = () => {
	const { isError, isLoading, data: onlineOptions } = useOnlineOption()

	return (
		<Scrollbar
			noDefaultStyles
			className='bg-secondary'
			style={{ height: '20.06rem', minHeight: '20.06rem' }}
		>
			{isLoading ? (
				<div className='min-h-[20.06rem] max-h-[20.06rem] w-full flex justify-center items-center'>
					<p className='text-primaryText text-xl text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='min-h-[20.06rem] max-h-[20.06rem] w-full flex justify-center items-center'>
					<p className='text-primaryText text-xl text-center'>Ошибка...</p>
				</div>
			) : (
				onlineOptions.map(option => (
					<OnlineOption key={option.id} id={option.id} title={option.title} />
				))
			)}
		</Scrollbar>
	)
}

export default OnlineList
