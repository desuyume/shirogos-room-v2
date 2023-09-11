import OrderPrice from '@/components/Admin/Orders/OrderPrice'
import OrdersContent from '@/components/Admin/Orders/OrdersContent'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Orders: FC = () => {
	return (
		<AdminWrapper>
			<div className='w-full h-full flex justify-between mt-7 ml-[1.6vw]'>
				<OrdersContent />
				<div className='w-[30%] h-full flex flex-col mr-[5.4vw]'>
					<OrderPrice type='game' />
					<OrderPrice type='viewing' />
				</div>
			</div>
		</AdminWrapper>
	)
}

export default Orders
