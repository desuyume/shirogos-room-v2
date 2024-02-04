import Manga from '@/components/Admin/Wikiteka/Manga'
import Wiki from '@/components/Admin/Wikiteka/Wiki'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Wikiteka: FC = () => {
	return (
		<AdminWrapper>
			<div className='w-full h-full mt-[0.69rem] ml-4 flex'>
				<Wiki />
				<Manga />
			</div>
		</AdminWrapper>
	)
}

export default Wikiteka