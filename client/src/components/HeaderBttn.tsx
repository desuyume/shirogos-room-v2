import { FC } from 'react';
import { Link } from 'react-router-dom'

interface IHeaderBttn { 
	path: string,
	title: string
}

const HeaderBttn: FC<IHeaderBttn> = ({ path, title }) => {
	const isActive = window.location.pathname === path

	return (
		<Link className={(isActive ? 'bg-transparent text-primary ' : 'bg-secondary text-white ') + 'rounded-[37px] text-xl w-[240px] inline-block text-center py-4 mr-5 last:mr-0'} to={path}>{title}</Link>
	);
};

export default HeaderBttn;