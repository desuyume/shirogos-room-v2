import { FC, useState } from 'react'

interface IRoleSwitcher {
	type: string
}

const RoleSwitcher: FC<IRoleSwitcher> = ({ type }) => {
	const [activeRole, setActiveRole] = useState<string>(
		type === 'adjective' ? 'Одинокий' : 'Водитель'
	)
	const roles =
		type === 'adjective'
			? ['Одинокий', 'Убогий', 'Прикольный', 'Ущербный']
			: ['Водитель', 'Крутыш', 'Кек', 'Лолик']

	const switchNextRole = () => {
		const index = roles.indexOf(activeRole)
		if (index === roles.length - 1) {
			setActiveRole(roles[0])
		} else {
			setActiveRole(roles[index + 1])
		}
	}

	const switchPrevRole = () => {
		const index = roles.indexOf(activeRole)
		if (index === 0) {
			setActiveRole(roles[roles.length - 1])
		} else {
			setActiveRole(roles[index - 1])
		}
	}

	return (
		<div className='h-[1.6875rem] w-full flex items-center relative'>
			<button
				onClick={switchPrevRole}
				className={
					(type === 'adjective' ? 'bg-[#DEDEDE] ' : 'bg-primary ') +
					'h-full w-[2%] hover:w-[5%] absolute left-0 transition-all'
				}
			/>
			<p className='flex-1 text-center text-primaryText text-[0.9375rem]'>
				{activeRole}
			</p>
			<button
				onClick={switchNextRole}
				className={
					(type === 'adjective' ? 'bg-[#DEDEDE] ' : 'bg-primary ') +
					'h-full w-[2%] hover:w-[5%] absolute right-0 transition-all'
				}
			/>
		</div>
	)
}

export default RoleSwitcher
