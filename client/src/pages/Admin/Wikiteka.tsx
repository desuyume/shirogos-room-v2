import Manga from '@/components/Admin/Wikiteka/Manga'
import Story from '@/components/Admin/Wikiteka/Story'
import Wiki from '@/components/Admin/Wikiteka/Wiki'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Wikiteka: FC = () => {
	return (
		<AdminWrapper>
			<div className='w-full h-full mt-[0.69rem] flex justify-around'>
				<Wiki />
				<Manga />
				<Story />
			</div>
		</AdminWrapper>
	)
}

export default Wikiteka