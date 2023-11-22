import { FC, useState } from 'react'
import { useBoutiqueUniqueRoles } from '@/api/useBoutiqueUniqueRoles'
import UniqueRoleItem from './UniqueRoleItem'

const UniqueRoles: FC = () => {
	const [visibleRole, setVisibleRole] = useState<string>('adjective')

	const { data: roles, isLoading, isError } = useBoutiqueUniqueRoles()

	return (
		<div className='medium-tablet:bg-primary bg-tertiary h-[20.0625rem] w-full rounded-b-[2.3125rem] flex items-center'>
			<div className='h-[8rem] border-[8.5rem] mb-4 border-transparent border-l-tertiary border-l-[15rem] laptop:flex justify-center items-center hidden'>
				<p className='text-primaryText text-[1.5625rem] leading-[97.795%] w-[10.5rem] absolute left-[1.12rem]'>
					Уголок уникальных ролей
				</p>
			</div>
			<div className='w-full h-full flex justify-evenly laptop:-ml-[12rem] relative rounded-b-[2.3125rem]'>
				{isLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-center text-primaryText'>Загрузка...</p>
					</div>
				) : isError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-center text-primaryText'>Ошибка</p>
					</div>
				) : (
					<>
						<UniqueRoleItem
							visibleRole={visibleRole}
							type='adjective'
							role={roles.adjectiveRole}
							isBuyed={roles.isAdjectiveBuyed}
						/>
						<UniqueRoleItem
							visibleRole={visibleRole}
							type='noun'
							role={roles.nounRole}
							isBuyed={roles.isNounBuyed}
						/>
						<button
							onClick={() =>
								visibleRole === 'adjective'
									? setVisibleRole('noun')
									: setVisibleRole('adjective')
							}
							className='w-8 h-8 bg-[#EBE984] absolute top-3 right-3 rounded-[2.3125rem] z-30 fullhd:hidden'
						/>
					</>
				)}
			</div>
		</div>
	)
}

export default UniqueRoles
