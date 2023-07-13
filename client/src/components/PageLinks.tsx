import { FC } from 'react';
import PageLink from './PageLink'

const PagesLinks: FC = () => {
	return (
		<div className='py-5 flex justify-center'>
			<PageLink path='/wiki' title='Википедия' />
			<PageLink path='/dangoteka' title='Данготека' />
		</div>
	);
};

export default PagesLinks;