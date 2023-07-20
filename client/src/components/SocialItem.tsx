import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ISocialItem {
	isPageLink: boolean
	link: string
	icon: string
}

const SocialItem: FC<ISocialItem> = ({ isPageLink, link, icon }) => {
	return isPageLink ? (
		<Link to={link}>
			<img src={icon} alt='social-con' />
		</Link>
	) : (
		<a href={link} target='_blank'>
			<img src={icon} alt='social-con' />
		</a>
	)
}

export default SocialItem
