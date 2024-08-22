import { FC } from 'react'
import PageLink from './PageLink'

const PagesLinks: FC = () => {
  return (
    <div className='relative flex h-[7.9375rem] w-full items-center justify-center bg-tertiary'>
      <div className='pointer-events-none absolute top-0 z-10 h-0 w-0 translate-y-[-100%] select-none border-b-[2.06rem] border-l-[12.875rem] border-r-[12.875rem] border-tertiary border-transparent border-b-tertiary' />
      <PageLink type='secondary' path='/wiki' title='Википедия' />
      <PageLink type='primary' path='/streamer' title='Стримерская' />
      <PageLink type='secondary' path='/dangoteka' title='Данготека' />
    </div>
  )
}

export default PagesLinks
