import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import AchievementsList from '@/components/Admin/Achievements/AchievementsList'

const Achievements: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <AdminWrapper>
      <div className='ml-4 mt-[0.69rem] h-full w-full'>
        <div className='relative mb-[0.63rem] flex h-[2.9375rem] w-[85.4%] items-center'>
          <img className='absolute left-3 h-[2.1875rem]' src={searchIcon} alt='search-icon' />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='h-full w-full bg-tertiary pl-[4.55rem] pr-2 font-secondary text-[1.5625rem] font-normal text-[#FFF] outline-none'
          />
        </div>
        <AchievementsList />
      </div>
    </AdminWrapper>
  )
}

export default Achievements
