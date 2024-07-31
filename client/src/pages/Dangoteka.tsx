import { FC, useEffect } from 'react'
import Header from '@/layout/Header/Header'
import DangotekaSection from '@/components/Dangoteka/DangotekaSection'
import { useLocation } from 'react-router-dom'

const Dangoteka: FC = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return (
		<>
			<Header withLine={true} isFixed={false} />
			<DangotekaSection title='Манга' type='manga' />
			<DangotekaSection title='Некриминальное Чтиво' type='story' />
		</>
	)
}

export default Dangoteka
