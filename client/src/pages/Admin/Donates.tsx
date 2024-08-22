import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import DonatesList from '@/components/Admin/Donates/DonatesList'
import AddDonater from '@/components/Admin/Donates/AddDonater'

const Donates: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  return (
    <AdminWrapper>
      <div className='relative ml-4 mt-[0.7rem] flex h-[2.9375rem] w-[62.6vw] items-center bg-tertiary'>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='h-full w-full rounded-[1.25rem] bg-tertiary pl-[4.77rem] font-secondary text-[1.5625rem] font-normal text-[#FFF] caret-primary outline-none'
        />
        <img className='pointer-events-none absolute left-3' src={searchIcon} alt='search-icon' />
      </div>
      <DonatesList searchQuery={searchQuery} />
      <AddDonater />
    </AdminWrapper>
  )
}

export default Donates
