import { FC } from 'react'
import youtubeIcon from '@/assets/youtubes/yt-icon.png'
import parse from 'html-react-parser'

interface IYoutubeLink {
  title: string
  imgPath: string
  desc: string
  link: string
  isMiniTitle?: boolean
}

const YoutubeLink: FC<IYoutubeLink> = ({ title, imgPath, desc, link, isMiniTitle }) => {
  return (
    <a
      href={link}
      target='_blank'
      className='mb-3.5 flex h-[67px] w-[60vw] items-center justify-between rounded-[37px] bg-[#A93232] transition-colors last:mb-0 hover:bg-[#CD5555]'
    >
      <img src={youtubeIcon} alt='yt-icon' />
      <p
        className={
          (isMiniTitle ? 'text-[1.75rem] ' : 'text-[2.125rem] ') +
          'w-[20vw] text-center leading-[95.295%] text-[#FFF]'
        }
      >
        {parse(title)}
      </p>
      <img src={'/images/' + imgPath + '.png'} alt='yt-img' />
      <p className='w-[18vw] text-[1.0625rem] leading-none text-primaryText'>{parse(desc)}</p>
    </a>
  )
}

export default YoutubeLink
