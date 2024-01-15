import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: FC = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		if (pathname.includes('/room')) return

		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

export default ScrollToTop
