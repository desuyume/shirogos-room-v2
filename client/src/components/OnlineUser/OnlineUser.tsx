import { useRandomOnlineOption } from '@/api/useRandomOnlineOption'
import { FC } from 'react'

const OnlineUser: FC = () => {
	const { isLoading, data: onlineOption, isError } = useRandomOnlineOption()

	return (
		<div className='w-[31.875rem] h-[6.0625rem] rounded-[2.3125rem] bg-secondary bg-opacity-80'>
			<p className='text-center text-primaryText text-xl mt-3 leading-none'>
				{isLoading
					? 'Загрузка...'
					: isError
					? 'Ошибка 0_0'
					: !onlineOption
					? 'никто не онлайн :('
					: 'Онлайн: ' + onlineOption.title}
			</p>
		</div>
	)
}

export default OnlineUser
