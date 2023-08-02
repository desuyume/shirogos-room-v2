import { FC } from 'react';
import { Link } from 'react-router-dom'

interface IPageLink { 
	path: string,
	title: string
}

const PageLink: FC<IPageLink> = ({ path, title }) => {
	return (
		<Link className='rounded-[37px] text-[2.8125rem] px-[3.25rem] py-3 bg-secondary mr-10 last:mr-0 hover:bg-secondaryHover hover:text-primaryHover transition-colors' to={path}>{title}</Link>
	);
};

export default PageLink;