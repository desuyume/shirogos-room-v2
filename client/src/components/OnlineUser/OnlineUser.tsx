import { useRandomOnlineOption } from '@/hooks/useRandomOnlineOption'
import { FC } from 'react'

const OnlineUser: FC = () => {
	const { isLoading, data: onlineOption, isError } = useRandomOnlineOption()

	return (
		<div className='w-[510px] h-[97px] rounded-[37px] bg-secondary absolute -bottom-[56px] left-7'>
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
