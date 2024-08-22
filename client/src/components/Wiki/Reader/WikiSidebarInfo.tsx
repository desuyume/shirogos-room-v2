import { FC } from 'react'

interface IWikiSidebarInfo {
  isSidebarOpen: boolean
  type: string
  value: string
}

const WikiSidebarInfo: FC<IWikiSidebarInfo> = ({ isSidebarOpen, type, value }) => {
  return (
    <>
      <div
        className={
          (isSidebarOpen ? '' : 'translate-x-[-150%]') +
          ' mt-[0.13rem] flex h-[4.3%] w-[9vw] items-center justify-center truncate bg-[#44B86B] transition-all duration-1000 ease-out'
        }
      >
        <p className='font-secondary text-base font-bold text-primaryText'>{type}</p>
      </div>
      <div
        className={
          (isSidebarOpen ? '' : 'translate-x-[-150%]') +
          ' mt-[0.13rem] flex h-[5.4%] w-[9vw] items-center justify-center truncate bg-secondaryHover transition-all duration-1000 ease-out'
        }
      >
        <p className='text-center font-secondary text-[0.9375rem] font-normal text-primaryText'>
          {value || '???'}
        </p>
      </div>
    </>
  )
}

export default WikiSidebarInfo
