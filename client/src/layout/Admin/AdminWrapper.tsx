import { FC, PropsWithChildren } from 'react'
import AdminHeader from './Header/AdminHeader'

const AdminWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AdminHeader />
			<div className='bg-secondaryHover min-h-[calc(100vh-5.25rem)]'>
				{children}
			</div>
		</>
	)
}

export default AdminWrapper
