import { FC } from 'react';
import { Link } from 'react-router-dom'

interface IHeaderBttn { 
	path: string,
	title: string
}

const AdminHeaderBttn: FC<IHeaderBttn> = ({ path, title }) => {
	const isActive = window.location.pathname === path

	return (
		<Link className={(isActive ? 'bg-transparent text-primary cursor-default' : 'bg-secondary text-white hover:bg-secondaryHover') + ' rounded-[37px] text-xl inline-block text-center py-4 mr-[0.8rem] last:mr-0 transition-all'} to={path}>{title}</Link>
	);
};

export default AdminHeaderBttn;