import { FC } from 'react'
import UniqueRole from './UniqueRole'

const UniqueRoles: FC = () => {
	return (
		<div className='w-[35.75rem] unique-roles'>
			<h3 className='bg-tertiary w-full h-[2.9375rem] flex justify-center items-center font-secondary font-bold text-xl text-[#FFF]'>
				Уникальные роли
			</h3>
			<div className='flex'>
				<UniqueRole title='Прилагательные' type='adjectives' />
				<UniqueRole title='Существительные' type='nouns' />
			</div>
		</div>
	)
}

export default UniqueRoles
