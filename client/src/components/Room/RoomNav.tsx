import { FC } from 'react'
import RoomNavBttn from './RoomNavBttn'

const RoomNav: FC = () => {
	const links = [
		{ title: 'Комната', path: '/room' },
		{ title: 'Кастомизация', path: '/room/customization' },
		{ title: 'Бутик', path: '/room/boutique' },
		{ title: 'Настройки', path: '/room/settings' },
		{ title: 'Редактор', path: '/room/editor' },
	]

	return (
		<nav className='flex justify-center items-center w-[73.85vw] mx-auto relative z-10 [&>a:first-child]:mr-3 [&>a:nth-child(2)]:mr-3 [&>a:nth-child(3)]:mr-[6.3rem] [&>a:nth-child(4)]:mr-[5.8rem]'>
			{links.map(link => (
				<RoomNavBttn key={link.path} path={link.path} title={link.title} />
			))}
			<hr className='border-secondary absolute w-full border-t-[0.5625rem] -z-10' />
		</nav>
	)
}

export default RoomNav
