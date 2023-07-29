import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface ISocialItem {
	isPageLink: boolean
	link: string
	icon: string
}

const SocialItem: FC<ISocialItem> = ({ isPageLink, link, icon }) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return isPageLink ? (
		<Link
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='relative'
			to={link}
		>
			<div className={(isHovered ? 'visible opacity-100' : 'invisible opacity-0') + ' bg-[#FFFFFF] bg-opacity-25 z-50 w-full h-full rounded-[0.9375rem] absolute transition-all'} />
			<img src={icon} alt='social-con' />
		</Link>
	) : (
		<a
			onMouseOver={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='relative hover:[&>div]:visible'
			href={link}
			target='_blank'
		>
			<div
				className={
					(isHovered ? 'visible opacity-100' : 'invisible opacity-0') +
					' bg-[#FFFFFF] bg-opacity-25 z-50 w-full h-full rounded-[0.9375rem] absolute transition-all'
				}
			/>
			<img src={icon} alt='social-con' />
		</a>
	)
}

export default SocialItem
