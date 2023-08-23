import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import SwitchRoles from '../Customization/SwitchRoles'
import SelectColor from '../Customization/SelectColor'
import SelectFavoriteCharacter from '../Customization/SelectFavoriteCharacter'
import SelectBackground from '../Customization/SelectBackground'

const RoomCustimization: FC = () => {
	const location = useLocation()
	const isActive = location.pathname === '/room/customization'

	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' transition-all bg-secondaryHover h-[35.25rem] rounded-[2.3125rem] pt-6 pb-[1.81rem] pl-[2.13rem] pr-7'
			}
		>
			<SelectColor
				className='mb-[0.56rem]'
				type='account'
				title='Цветовая тема аккаунта'
			/>
			<SelectColor
				className='mb-[1.13rem]'
				type='nickname'
				title='Цвет никнейма'
			/>
			<div className='flex'>
				<div className='min-w-[20%]'>
					<SwitchRoles />
					<SelectFavoriteCharacter />
				</div>
				<SelectBackground />
			</div>
		</div>
	)
}

export default RoomCustimization
