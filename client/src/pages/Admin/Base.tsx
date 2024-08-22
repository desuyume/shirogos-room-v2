import BirthdayAward from '@/components/Admin/Base/BirthdayAward/BirthdayAward'
import Chronicles from '@/components/Admin/Base/Chronicles/Chronicles'
import News from '@/components/Admin/Base/News/News'
import Notification from '@/components/Admin/Base/Notification/Notification'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC } from 'react'

const Base: FC = () => {
  return (
    <AdminWrapper>
      <div className='mt-[7.75rem] flex h-full w-full flex-col items-center justify-center'>
        <div className='mb-[1.86rem] h-full w-[73.59375vw]'>
          <Chronicles />
        </div>
        <div className='flex h-[11.75rem] w-[73.59375vw] justify-between'>
          <Notification />
          <News />
          <BirthdayAward />
        </div>
      </div>
    </AdminWrapper>
  )
}

export default Base
