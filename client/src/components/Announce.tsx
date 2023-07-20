import { FC } from 'react';
import announceImg from '../assets/announce.png'

const Announce: FC = () => {
	return (
		<div className='w-[1056px] h-[150px] bg-tertiary bg-opacity-40 absolute top-4 right-6 rounded-[37px] flex justify-between items-center pr-[15px]'>
			<img className='h-full rounded-[37px]' src={announceImg} alt='announce-img' />
			<p className='text-primaryText font-secondary font-bold text-[1.5625rem] flex-1 ml-8'>Добавлена 3 Глава Манги FOR:LOWERS</p>
			<p className='text-primaryText font-secondary font-bold text-xl max-w-[110px] text-center mr-8'>Сегодня в 19:30</p>
			<hr className='w-[9px] h-[80px] bg-[#EBE984] rounded-[25px]' />
		</div>
	);
};

export default Announce;