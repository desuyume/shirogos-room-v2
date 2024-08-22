import { FC, PropsWithChildren } from 'react'
import AdminHeader from './Header/AdminHeader'

const AdminWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='min-h-screen w-screen bg-secondaryHover'>
      <AdminHeader />
      {children}
    </div>
  )
}

export default AdminWrapper
