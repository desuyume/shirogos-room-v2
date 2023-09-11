import { FC, PropsWithChildren } from 'react'
import AdminHeader from './Header/AdminHeader'

const AdminWrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='bg-secondaryHover min-h-screen w-screen'>
			<AdminHeader />
			{children}
		</div>
	)
}

export default AdminWrapper
