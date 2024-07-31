import { FC } from 'react'
import PageLink from './PageLink'

const PagesLinks: FC = () => {
	return (
		<div className='w-full h-[7.9375rem] flex justify-center items-center bg-tertiary relative'>
			<div className='w-0 h-0 border-transparent border-l-[12.875rem] border-r-[12.875rem] border-b-tertiary border-b-[2.06rem] border-tertiary absolute top-0 translate-y-[-100%] select-none pointer-events-none z-10' />
			<PageLink type='secondary' path='/wiki' title='Википедия' />
			<PageLink type='primary' path='/streamer' title='Стримерская' />
			<PageLink type='secondary' path='/dangoteka' title='Данготека' />
		</div>
	)
}

export default PagesLinks
