import { FC } from 'react';

interface IAuthBttn { 
	icon: string,
	clickEvent: () => void
}

const AuthBttn: FC<IAuthBttn> = ({ icon, clickEvent }) => {
	return (
		<button className='mb-3 last:mb-0 [&:nth-last-child(2)]:mb-0' onClick={clickEvent}>
			<img src={icon} alt='auth-icon' />
		</button>
	);
};

export default AuthBttn;