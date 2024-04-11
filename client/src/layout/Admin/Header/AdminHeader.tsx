import { FC, useState } from 'react'
import logo from '@/assets/logo.png'
import logoHover from '@/assets/logo-hover.png'
import { Link } from 'react-router-dom'
import HeaderBttn from '@/layout/Header/HeaderBttn'

const AdminHeader: FC = () => {
	const [isLogoHover, setIsLogoHover] = useState<boolean>(false)
	const links = [
		{ path: '/admin/users', title: 'Пользователи' },
		{ path: '/admin/donates', title: 'Донаты' },
		{ path: '/admin/achievements', title: 'Достижения' },
		{ path: '/admin/customization', title: 'Кастомизация' },
		{ path: '/admin/wikiteka', title: 'Вики/Тека' },
		{ path: '/admin/orders', title: 'Заказы' },
		{ path: '/admin/base', title: 'База' },
		{ path: '/admin/tasks', title: 'Задания' },
	]

	return (
		<div className='bg-tertiary h-[5.25rem] flex justify-center items-center z-50'>
			<Link
				className='absolute left-4'
				to='/'
				onMouseOver={() => setIsLogoHover(true)}
				onMouseLeave={() => setIsLogoHover(false)}
			>
				<img src={isLogoHover ? logoHover : logo} alt='logo' />
			</Link>
			<nav className='pl-[5.6rem] pr-3 flex overflow-hidden'>
				{links.map(link => (
					<HeaderBttn key={link.path} path={link.path} title={link.title} />
				))}
			</nav>
		</div>
	)
}

export default AdminHeader
