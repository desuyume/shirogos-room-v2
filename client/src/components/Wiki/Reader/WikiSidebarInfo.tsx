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
          ' mt-[0.13rem] flex min-h-[4.3%] w-[9vw] items-center justify-center bg-[#44B86B] transition-all duration-1000 ease-out'
        }
      >
        <p className='max-w-full font-secondary text-base font-bold text-primaryText break-words text-center px-1 leading-4 py-1'>{type}</p>
      </div>
      <div
        className={
          (isSidebarOpen ? '' : 'translate-x-[-150%]') +
          ' mt-[0.13rem] flex min-h-[5.4%] w-[9vw] items-center justify-center bg-secondaryHover transition-all duration-1000 ease-out'
        }
      >
        <p className='max-w-full font-secondary text-[0.9375rem] font-normal text-primaryText break-words hyphens-auto text-center px-1 leading-4 py-1'>
          {value || '???'}
        </p>
      </div>
    </>
  )
}

export default WikiSidebarInfo
