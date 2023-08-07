import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const RolesList: FC = () => {
	const roles = ['Одинокий', 'Одинокий', 'Одинокий', 'Одинокий', 'Одинокий']

	return (
		<Scrollbar noDefaultStyles style={{ height: '7rem' }}>
			<div className='pt-[0.31rem] flex flex-col items-center max-h-[7rem] min-h-[7rem]'>
				{roles.map(role => (
					<p className='text-[#FFF] font-secondary font-bold text-[0.9375rem] mb-[0.3rem] last-of-type:mb-0 last-of-type:pb-[0.31rem]'>
						{role}
					</p>
				))}
			</div>
		</Scrollbar>
	)
}

export default RolesList
