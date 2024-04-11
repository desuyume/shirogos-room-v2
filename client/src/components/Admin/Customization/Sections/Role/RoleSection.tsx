import { useRoles } from '@/api/useRoles'
import { UniqueRoleType } from '@/types/unique-role.interface'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import RoleItem from './RoleItem'

const RoleSection: FC = () => {
	const {
		data: adjectives,
		isLoading: isAdjectivesLoading,
		isError: isAdjectivesError,
	} = useRoles(UniqueRoleType.adjectives)
	const {
		data: nouns,
		isLoading: isNounsLoading,
		isError: isNounsError,
	} = useRoles(UniqueRoleType.nouns)

	return (
		<div className='w-[93.3125rem] h-[50.25rem] flex justify-between unique-roles-admin'>
			<div className='w-[37.3125rem] h-full bg-secondary'>
				<div className='w-full h-11 bg-tertiary flex items-center'>
					<div className='w-[27.5%] h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Продаем?</p>
					</div>
					<div className='w-[33%] h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Цена, до</p>
					</div>
					<div className='flex-1 h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Прилагательное</p>
					</div>
				</div>
				<Scrollbar
					noDefaultStyles
					className='w-[45.0625rem]'
					style={{ height: '47.5rem' }}
				>
					{isAdjectivesLoading ? (
						<div className='w-full h-full flex justify-center items-center'>
							<p className='text-[#FFF] text-xl'>Загрузка...</p>
						</div>
					) : isAdjectivesError ? (
						<div className='w-full h-full flex justify-center items-center'>
							<p className='text-[#FFF] text-xl'>Ошибка</p>
						</div>
					) : (
						<>
							{adjectives.map(adjective => (
								<RoleItem
									key={adjective.id}
									role={adjective}
									type={UniqueRoleType.adjectives}
								/>
							))}
							<RoleItem type={UniqueRoleType.adjectives} isNew />
						</>
					)}
				</Scrollbar>
			</div>
			<div className='w-[37.3125rem] h-full bg-secondary'>
				<div className='w-full h-11 bg-tertiary flex items-center'>
					<div className='w-[27.5%] h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Продаем?</p>
					</div>
					<div className='w-[33%] h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Цена, до</p>
					</div>
					<div className='flex-1 h-full flex justify-center items-center'>
						<p className='text-[#FFF] text-xl'>Существительное</p>
					</div>
				</div>
				<Scrollbar
					noDefaultStyles
					className='w-[45.0625rem]'
					style={{ height: '47.5rem' }}
				>
					{isNounsLoading ? (
						<div className='w-full h-full flex justify-center items-center'>
							<p className='text-[#FFF] text-xl'>Загрузка...</p>
						</div>
					) : isNounsError ? (
						<div className='w-full h-full flex justify-center items-center'>
							<p className='text-[#FFF] text-xl'>Ошибка</p>
						</div>
					) : (
						<>
							{nouns.map(noun => (
								<RoleItem
									key={noun.id}
									role={noun}
									type={UniqueRoleType.nouns}
								/>
							))}
							<RoleItem type={UniqueRoleType.nouns} isNew />
						</>
					)}
				</Scrollbar>
			</div>
		</div>
	)
}

export default RoleSection
