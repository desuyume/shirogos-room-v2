import { FC, useState } from 'react';

const OnlineUser: FC = () => {
	const [username, _] = useState<string>("mercenaryJulian")

	return (
		<div className='w-[510px] h-[97px] rounded-[37px] bg-secondary absolute -bottom-[56px] left-7'>
			<p className='text-center text-[#DEDEDE] text-xl mt-3 leading-none'>Онлайн: {username}</p>
		</div>
	);
};

export default OnlineUser;