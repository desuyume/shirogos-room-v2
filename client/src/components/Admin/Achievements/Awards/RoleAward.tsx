import { useUniqueRoles } from '@/api/useUniqueRoles'
import { AwardType } from '@/types/achievements.interface'
import { IUniqueRole, UniqueRoleType } from '@/types/unique-role.interface'
import { FC, useEffect, useState } from 'react'
import { IRoles } from '../AchievementItem'

interface IRoleAward {
	selectedAwardType: AwardType | null
	roles: IRoles | null
	setRoles: React.Dispatch<React.SetStateAction<IRoles | null>>
}

const RoleAward: FC<IRoleAward> = ({ selectedAwardType, roles, setRoles }) => {
	const [activeType, setActiveType] = useState<UniqueRoleType>(
		UniqueRoleType.adjectives
	)
	const [activeRoles, setActiveRoles] = useState<IUniqueRole[] | null>(null)

	const {
		data: adjectives,
		isLoading: isAdjectivesLoading,
		isError: isAdjectivesError,
		isSuccess: isAdjectivesSuccess,
	} = useUniqueRoles(UniqueRoleType.adjectives)
	const {
		data: nouns,
		isLoading: isNounsLoading,
		isError: isNounsError,
		isSuccess: isNounsSuccess,
	} = useUniqueRoles(UniqueRoleType.nouns)

	const isActiveRole = (id: number) =>
		roles?.adjective === id || roles?.noun === id

	const clickRole = (id: number) => {
		const newRoles = {
			adjective: roles?.adjective ?? null,
			noun: roles?.noun ?? null,
		}

		if (activeType === UniqueRoleType.adjectives) {
			newRoles.adjective = id === roles?.adjective ? null : id
		} else {
			newRoles.noun = id === roles?.noun ? null : id
		}

		setRoles(newRoles)
	}

	useEffect(() => {
		if (activeType === UniqueRoleType.adjectives && isAdjectivesSuccess) {
			setActiveRoles(adjectives)
		} else if (activeType === UniqueRoleType.nouns && isNounsSuccess) {
			setActiveRoles(nouns)
		}
	}, [activeType, isAdjectivesSuccess, isNounsSuccess])

	return (
		<div
			className={
				(selectedAwardType === 'unique-role' ? 'block ' : 'hidden ') +
				'w-full flex-1 flex flex-col justify-center items-center transition-all relative'
			}
		>
			<div className='w-full flex items-center justify-around h-[25%]'>
				<button
					className={
						(activeType === UniqueRoleType.adjectives
							? ' text-primary'
							: 'text-primaryText hover:text-[#FFF]') + ' transition-all'
					}
					onClick={() => setActiveType(UniqueRoleType.adjectives)}
				>
					Прил
				</button>
				<button
					className={
						(activeType === UniqueRoleType.nouns
							? ' text-primary'
							: 'text-primaryText hover:text-[#FFF]') + ' transition-all'
					}
					onClick={() => setActiveType(UniqueRoleType.nouns)}
				>
					Сущ
				</button>
			</div>
			<div className='w-full h-[75%] max-h-[75%] overflow-y-auto'>
				{isAdjectivesLoading || isNounsLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText'>Загрузка...</p>
					</div>
				) : isAdjectivesError || isNounsError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText'>Ошибка</p>
					</div>
				) : (
					activeRoles?.map(role => (
						<button
							onClick={() => clickRole(role.id)}
							className={
								'w-full text-[#FFF] px-1 hover:bg-secondary cursor-pointer transition-all' +
								(isActiveRole(role.id) ? ' bg-secondary' : '')
							}
						>
							{role.title}
						</button>
					))
				)}
			</div>
		</div>
	)
}

export default RoleAward
