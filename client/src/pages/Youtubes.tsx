import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import backArrow from '../assets/youtubes/back-arrow.svg'
import backArrowHover from '../assets/youtubes/back-arrow-hover.svg'
import YoutubeLink from '../components/YoutubeLink'

const Youtubes: FC = () => {
	const [isBackBttnHovered, setIsBackBttnHovered] = useState(false)

	return (
		<div className='h-screen flex flex-col justify-center items-center'>
			<div className='w-[80vw] bg-secondary rounded-[37px] rounded-b-none py-3.5 pl-10'>
				<Link
					onMouseOver={() => setIsBackBttnHovered(true)}
					onMouseLeave={() => setIsBackBttnHovered(false)}
					className='flex items-center hover:[&>p]:text-[#FFFFFF] hover:[&>img] w-[111px]'
					to='/'
				>
					<img
						src={isBackBttnHovered ? backArrowHover : backArrow}
						alt='back-arrow'
					/>
					<p 
						className={(isBackBttnHovered ? 'text-[#FFFFFF]' : 'text-primaryText')}
					>
							НА САЙТ</p>
				</Link>
			</div>
			<div className='w-[80vw] bg-secondary flex flex-col items-center mt-4 py-8 max-h-[70vh] overflow-y-auto'>
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
				<YoutubeLink
					title='GOROD KRIPOV'
					imgPath='crypto'
					desc='Крипто-игры, нейросети.'
					link='https://www.youtube.com/channel/UCgOf2Bj8lfryM5yU2lqmXQA'
				/>
			</div>
		</div>
	)
}

export default Youtubes
