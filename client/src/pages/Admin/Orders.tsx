import OrderPrice from '@/components/Admin/Orders/OrderPrice'
import OrdersContent from '@/components/Admin/Orders/OrdersContent'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Orders: FC = () => {
  return (
    <AdminWrapper>
      <div className='ml-[1.6vw] mt-7 flex h-full w-full justify-between'>
        <OrdersContent />
        <div className='mr-[5.4vw] flex h-full w-[30%] flex-col'>
          <OrderPrice type='game' />
          <OrderPrice type='viewing' />
        </div>
      </div>
    </AdminWrapper>
  )
}

export default Orders
