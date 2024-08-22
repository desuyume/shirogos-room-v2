import DonatesMarquee from '@/components/Donates/DonatesMarquee'
import Header from '@/layout/Header/Header'
import { FC, useState } from 'react'
import Chronicles from '@/components/Chronicles/Chronicles'
import watchTableImg from '@/assets/watch-table.png'
import watchTableHoverImg from '@/assets/watch-table-hover.png'
import Orders from '@/components/Orders/Orders'
import { cn } from '@/utils/cn'

const Streamer: FC = () => {
  const [isDocsHover, setIsDocsHover] = useState<boolean>(false)

  return (
    <>
      <Header isFixed={false} withLine={false} />
      <div className='relative aspect-[16/9] w-full bg-streamer-bg bg-cover bg-center bg-no-repeat pb-4'>
        <DonatesMarquee />
        <Orders className='ml-[21rem] mt-[31.125rem]' />
        <Chronicles />
        <a
          className='absolute left-[8.125rem] top-[37.5rem] h-[154.33px] w-[103px] hover:scale-[1.3]'
          onMouseOver={() => setIsDocsHover(true)}
          onMouseLeave={() => setIsDocsHover(false)}
          href='https://docs.google.com/spreadsheets/d/1Qa0lxGo0qPGpLf2k2HsfinIy6zfg7MYlgWGRsG88Eac/edit?usp=sharing'
          target='_blank'
        >
          <div className='relative'>
            <img
              className={cn('absolute h-[154.33px] w-[103px]', {
                'visible opacity-100': !isDocsHover,
                'invisible opacity-0': isDocsHover
              })}
              src={watchTableImg}
              alt='docs-icon'
            />
            <img
              className={cn('absolute h-[154.33px] w-[103px]', {
                'visible opacity-100': isDocsHover,
                'invisible opacity-0': !isDocsHover
              })}
              src={watchTableHoverImg}
              alt='docs-icon'
            />
          </div>
        </a>
      </div>
    </>
  )
}

export default Streamer
