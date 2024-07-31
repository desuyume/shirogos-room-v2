import BirthdayAward from '@/components/Admin/Base/BirthdayAward/BirthdayAward'
import Chronicles from '@/components/Admin/Base/Chronicles/Chronicles'
import News from '@/components/Admin/Base/News/News'
import Notification from '@/components/Admin/Base/Notification/Notification'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Base: FC = () => {
	return (
		<AdminWrapper>
			<div className='w-full h-full flex flex-col justify-center items-center mt-[7.75rem]'>
				<div className='w-[73.59375vw] h-full mb-[1.86rem]'>
					<Chronicles />
				</div>
				<div className='w-[73.59375vw] h-[11.75rem] flex justify-between'>
					<Notification />
					<News />
					<BirthdayAward />
				</div>
			</div>
		</AdminWrapper>
	)
}

export default Base
