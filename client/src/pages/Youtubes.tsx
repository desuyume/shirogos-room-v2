import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import backArrow from '@/assets/youtubes/back-arrow.svg'
import backArrowHover from '@/assets/youtubes/back-arrow-hover.svg'
import YoutubeLink from '@/components/Socials/YoutubeLink'

const Youtubes: FC = () => {
  const [isBackBttnHovered, setIsBackBttnHovered] = useState(false)

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='w-[80vw] rounded-[37px] rounded-b-none bg-secondary py-3.5 pl-10'>
        <Link
          onMouseOver={() => setIsBackBttnHovered(true)}
          onMouseLeave={() => setIsBackBttnHovered(false)}
          className='hover:[&>img] flex w-[111px] items-center hover:[&>p]:text-[#FFFFFF]'
          to='/'
        >
          <img src={isBackBttnHovered ? backArrowHover : backArrow} alt='back-arrow' />
          <p className={isBackBttnHovered ? 'text-[#FFFFFF]' : 'text-primaryText'}>НА САЙТ</p>
        </Link>
      </div>
      <div className='mt-4 flex max-h-[70vh] w-[80vw] flex-col items-center overflow-y-auto bg-secondary py-8'>
        <YoutubeLink
          title='ШИРОНЕЛ'
          imgPath='shironel'
          link='https://www.youtube.com/@shironel_'
          desc='Аниме-обзоры <br/> и прочее на тему <br/> аниме.'
        />
        <YoutubeLink
          title='ШИРОНЕЛ <br/> КОВЁР'
          imgPath='anime-covers'
          desc='Аниме-каверы.'
          link='https://www.youtube.com/channel/UCc5wCC46IHDokWSA8YBhKlA'
          isMiniTitle={true}
        />
        <YoutubeLink
          title='Стримы <br/> GODofDANGO'
          imgPath='base-channel'
          desc='Базовый канал с <br/> нарезками и прочим.'
          link='https://www.youtube.com/channel/UCXuxqYlIRgXhTVU0xyi4e5Q'
          isMiniTitle={true}
        />
        <YoutubeLink
          title='DANGO <br/> ENTERTAINMENT'
          imgPath='dangoverse'
          desc='Данговерс начинается <br/> здесь.'
          link='https://www.youtube.com/@dango-entertainment'
          isMiniTitle={true}
        />
        <YoutubeLink
          title='ДАНГО ИГРОК'
          imgPath='gameplay'
          desc='Прохождения игр.'
          link='https://www.youtube.com/@dango_igrok'
        />
      </div>
    </div>
  )
}

export default Youtubes
