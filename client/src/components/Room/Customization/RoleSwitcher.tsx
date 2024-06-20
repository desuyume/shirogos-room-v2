import { RoomAppearanceContext } from '@/Context'
import { useChangeUniqueRole } from '@/api/useChangeUniqueRole'
import { useUserUniqueRoles } from '@/api/useUserUniqueRoles'
import { colorVariants } from '@/consts/roomColors'
import { UniqueRoleType } from '@/types/unique-role.interface'
import { FC, useContext, useEffect, useState } from 'react'

interface IRoleSwitcher {
	type: string
}

const RoleSwitcher: FC<IRoleSwitcher> = ({ type }) => {
	const [activeRole, setActiveRole] = useState<string | null>(null)
	const [roles, setRoles] = useState<string[]>([])
	const roomAppearance = useContext(RoomAppearanceContext)

	const {
		isLoading,
		isSuccess,
		isError,
		isFetchedAfterMount,
		data: uniqueRoles,
	} = useUserUniqueRoles()
	const { mutate } = useChangeUniqueRole(type)

	const switchNextRole = () => {
		if (activeRole) {
			const index = roles.indexOf(activeRole)
			if (index === roles.length - 1) {
				setActiveRole(roles[0])
			} else {
				setActiveRole(roles[index + 1])
			}
		} else {
			setActiveRole(roles[0])
		}
	}

	const switchPrevRole = () => {
		if (activeRole) {
			const index = roles.indexOf(activeRole)
			if (index === 0) {
				setActiveRole(roles[roles.length - 1])
			} else {
				setActiveRole(roles[index - 1])
			}
		} else {
			setActiveRole(roles[roles.length - 1])
		}
	}

	useEffect(() => {
		if (!isLoading) {
			if (isSuccess) {
				if (type === 'adjective') {
					const adjectives = uniqueRoles.unique_roles.filter(
						role => role.UniqueRole.type === UniqueRoleType.ADJECTIVES
					)
					setRoles(adjectives.map(role => role.UniqueRole.title))
					setActiveRole(uniqueRoles.selected_unique_role_adjective)
				} else {
					const nouns = uniqueRoles.unique_roles.filter(
						role => role.UniqueRole.type === UniqueRoleType.NOUNS
					)
					setRoles(nouns.map(role => role.UniqueRole.title))
					setActiveRole(uniqueRoles.selected_unique_role_noun)
				}
			}
		}
	}, [isLoading])

	useEffect(() => {
		if (isFetchedAfterMount && isSuccess) {
			if (
				type === 'adjective' &&
				activeRole !== uniqueRoles.selected_unique_role_adjective
			) {
				mutate({ role: activeRole })
			}

			if (
				type === 'noun' &&
				activeRole !== uniqueRoles.selected_unique_role_noun
			) {
				mutate({ role: activeRole })
			}
		}
	}, [activeRole])

	return (
		<div className='h-[1.6875rem] w-full flex items-center relative'>
			{isLoading ? (
				<p className='w-full h-full text-center text-primaryText'>
					загрузка...
				</p>
			) : isError ? (
				<p className='w-full h-full text-center text-primaryText'>ошибка 0_0</p>
			) : (
				<>
					<button
						disabled={(roles.length === 1 && !!activeRole) || !roles.length}
						onClick={switchPrevRole}
						className={
							(type === 'adjective'
								? 'bg-[#DEDEDE] '
								: `${colorVariants.bg[roomAppearance.active_room_color]} `) +
							'h-full w-[2%] hover:w-[5%] absolute left-0 transition-all disabled:opacity-50 disabled:hover:w-[2%]'
						}
					/>
					<p className='flex-1 text-center text-primaryText text-[0.9375rem]'>
						{!activeRole ? 'не выбрана' : activeRole}
					</p>
					<button
						disabled={(roles.length === 1 && !!activeRole) || !roles.length}
						onClick={switchNextRole}
						className={
							(type === 'adjective'
								? 'bg-[#DEDEDE] '
								: `${colorVariants.bg[roomAppearance.active_room_color]} `) +
							'h-full w-[2%] hover:w-[5%] absolute right-0 transition-all disabled:opacity-50 disabled:hover:w-[2%]'
						}
					/>
				</>
			)}
		</div>
	)
}

export default RoleSwitcher
