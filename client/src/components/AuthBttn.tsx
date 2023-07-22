import { FC } from 'react';

interface IAuthBttn { 
	service: string,
	icon: string,
	clickEvent: () => void
}

const AuthBttn: FC<IAuthBttn> = ({ service, icon, clickEvent }) => {
	return (
		<button className={(service !== "Twitch" && 'opacity-50 hover:opacity-100') + ' mb-3 last:mb-0 [&:nth-last-child(2)]:mb-0 transition-opacity'} onClick={clickEvent}>
			<img src={icon} alt='auth-icon' />
		</button>
	);
};

export default AuthBttn;