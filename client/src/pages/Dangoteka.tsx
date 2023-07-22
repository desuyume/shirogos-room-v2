import { FC } from 'react';
import Header from '../components/Header'
import DangotekaSection from '../components/DangotekaSection'

const Dangoteka: FC = () => {
	return (
		<>
			<Header />
			<DangotekaSection title='Манга' type='manga' />
			<DangotekaSection title='Рассказы' type='stories' />
		</>
	);
};

export default Dangoteka;