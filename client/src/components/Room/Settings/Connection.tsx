import type { AuthServices } from '@/components/Auth/AuthModal'
import { IConnection } from '@/types/user.interface'
import { cn } from '@/utils/cn'
import { FC } from 'react'

interface ConnectionProps {
	service: AuthServices
	connectionData: IConnection
	icon: string
	isDisabled?: boolean
}

const Connection: FC<ConnectionProps> = ({
	service,
	connectionData,
	icon,
	isDisabled,
}) => {
	return (
		<button
			disabled={isDisabled}
			className={cn('flex items-center transition-all odd:mb-4', {
				'opacity-50': !connectionData,
				'hover:opacity-100': !connectionData && !isDisabled,
				'cursor-default': connectionData,
			})}
		>
			<img className='mr-4' src={icon} alt={`${service}-icon`} />
			<p className='text-primaryText text-xl'>
				{connectionData ? connectionData.displayName : 'не подключено'}
			</p>
		</button>
	)
}

export default Connection
