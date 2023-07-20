import { FC } from 'react';
import youtubeIcon from '../assets/youtubes/yt-icon.png'
import parse from 'html-react-parser'

interface IYoutubeLink { 
	title: string,
	imgPath: string,
	desc: string,
	link: string,
	isMiniTitle?: boolean
}

const YoutubeLink: FC<IYoutubeLink> = ({ title, imgPath, desc, link, isMiniTitle }) => {
	return (
		<a href={link} target='_blank' className='flex justify-between items-center h-[67px] bg-[#A93232] rounded-[37px] w-[60vw] hover:bg-[#CD5555] transition-colors mb-3.5 last:mb-0'>
			<img src={youtubeIcon} alt='yt-icon' />
			<p className={(isMiniTitle ? 'text-[1.75rem] ' : 'text-[2.125rem] ') + 'text-[#FFF] text-center leading-[95.295%] w-[20vw]'}>{parse(title)}</p>
			<img src={"/images/" + imgPath + '.png'} alt='yt-img' />
			<p className='text-[1.0625rem] text-primaryText leading-none w-[18vw]'>{parse(desc)}</p>
		</a>
	);
};

export default YoutubeLink;