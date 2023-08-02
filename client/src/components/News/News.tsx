import { FC, useState } from 'react';
import newsImg from '@/assets/news.png'

const News: FC = () => {
	const [isNextBttnHovered, setIsNextBttnHovered] = useState<boolean>(false)

	return (
		<div className='w-[1056px] h-[150px] bg-tertiary bg-opacity-40 absolute top-4 right-6 rounded-[37px] flex justify-between items-center pr-[15px]'>
			<img className='h-full rounded-[37px]' src={newsImg} alt='announce-img' />
			<p className='text-primaryText font-secondary font-bold text-[1.5625rem] flex-1 ml-8'>Добавлена 3 Глава Манги FOR:LOWERS</p>
			<p className={(isNextBttnHovered && 'mr-[1.37rem]') + ' text-primaryText font-secondary font-bold text-xl max-w-[110px] text-center ml-2.5 mr-8 transition-all'}>Сегодня в 19:30</p>
			<button 
				className={(isNextBttnHovered && 'w-[1.1875rem] rounded-[0.3125rem] h-[5.0625rem]') + ' w-[0.5625rem] h-[5rem] bg-[#EBE984] rounded-[1.5625rem] transition-all'}
				onMouseOver={() => setIsNextBttnHovered(true)}
				onMouseLeave={() => setIsNextBttnHovered(false)}
			/>
		</div>
	);
};

export default News;