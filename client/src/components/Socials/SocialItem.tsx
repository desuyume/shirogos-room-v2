import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ISocialItem {
  isPageLink: boolean
  link: string
  icon: string
}

const SocialItem: FC<ISocialItem> = ({ isPageLink, link, icon }) => {
  return isPageLink ? (
    <Link className='relative' to={link}>
      <div className='absolute h-full w-full rounded-[0.9375rem] transition-all' />
      <img src={icon} alt='social-con' />
    </Link>
  ) : (
    <a className='relative' href={link} target='_blank'>
      <div className='absolute h-full w-full rounded-[0.9375rem] transition-all' />
      <img src={icon} alt='social-con' />
    </a>
  )
}

export default SocialItem
