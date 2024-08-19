import { FC, useEffect } from 'react'
import Header from '@/layout/Header/Header'
import { useLocation } from 'react-router-dom'
import DangotekaSectionList from '@/components/Dangoteka/DangotekaSectionList'

export type DangotekaItemType = 'manga' | 'story'

const Dangoteka: FC = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return (
		<>
			<Header withLine={true} isFixed={false} />
			<div className='py-2'>
				<DangotekaSectionList type='manga' className='mb-[1.1875rem]' />
				<DangotekaSectionList type='story' />
			</div>
		</>
	)
}

export default Dangoteka
