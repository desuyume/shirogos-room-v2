import { FC, useEffect } from 'react';
import Header from '../components/Header'
import DangotekaSection from '../components/DangotekaSection'
import { useLocation } from 'react-router-dom'

const Dangoteka: FC = () => {
	const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

	return (
		<>
			<Header />
			<DangotekaSection title='Манга' type='manga' />
			<DangotekaSection title='Рассказы' type='stories' />
		</>
	);
};

export default Dangoteka;