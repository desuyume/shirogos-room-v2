import { useUniqueRoles } from '@/api/useUniqueRoles'
import { AwardType } from '@/types/achievements.interface'
import { IUniqueRole, UniqueRoleType } from '@/types/unique-role.interface'
import { FC, useEffect, useState } from 'react'
import { IRoles } from '../AchievementItem'

interface IRoleAward {
  selectedAwardType: AwardType | null
  roles: IRoles | null
  setRoles: React.Dispatch<React.SetStateAction<IRoles | null>>
  isNew: boolean
}

const RoleAward: FC<IRoleAward> = ({ selectedAwardType, roles, setRoles, isNew }) => {
  const [activeType, setActiveType] = useState<UniqueRoleType>(UniqueRoleType.ADJECTIVES)
  const [activeRoles, setActiveRoles] = useState<IUniqueRole[] | null>(null)

  const {
    data: adjectives,
    isLoading: isAdjectivesLoading,
    isError: isAdjectivesError,
    isSuccess: isAdjectivesSuccess
  } = useUniqueRoles(UniqueRoleType.ADJECTIVES)
  const {
    data: nouns,
    isLoading: isNounsLoading,
    isError: isNounsError,
    isSuccess: isNounsSuccess
  } = useUniqueRoles(UniqueRoleType.NOUNS)

  const isActiveRole = (id: number) => roles?.adjective === id || roles?.noun === id

  const clickRole = (id: number) => {
    const newRoles = {
      adjective: roles?.adjective ?? null,
      noun: roles?.noun ?? null
    }

    if (activeType === UniqueRoleType.ADJECTIVES) {
      newRoles.adjective = id === roles?.adjective ? null : id
    } else {
      newRoles.noun = id === roles?.noun ? null : id
    }

    setRoles(newRoles)
  }

  useEffect(() => {
    if (activeType === UniqueRoleType.ADJECTIVES && isAdjectivesSuccess) {
      setActiveRoles(adjectives)
    }
    if (activeType === UniqueRoleType.NOUNS && isNounsSuccess) {
      setActiveRoles(nouns)
    }
  }, [activeType, isAdjectivesSuccess, isNounsSuccess])

  return (
    <div
      className={
        (selectedAwardType === 'unique-role' ? 'block ' : 'hidden ') +
        'relative flex w-full flex-1 flex-col items-center justify-center transition-all'
      }
    >
      <div className='flex h-[25%] w-full items-center justify-around'>
        <button
          className={
            (activeType === UniqueRoleType.ADJECTIVES
              ? ' text-primary'
              : 'text-primaryText hover:text-[#FFF]') + ' transition-all'
          }
          onClick={() => setActiveType(UniqueRoleType.ADJECTIVES)}
        >
          Прил
        </button>
        <button
          className={
            (activeType === UniqueRoleType.NOUNS
              ? ' text-primary'
              : 'text-primaryText hover:text-[#FFF]') + ' transition-all'
          }
          onClick={() => setActiveType(UniqueRoleType.NOUNS)}
        >
          Сущ
        </button>
      </div>
      <div
        className={
          'h-[75%] max-h-[75%] w-full overflow-y-auto' +
          (!isNew ? ' flex items-center justify-center pb-4' : '')
        }
      >
        {isAdjectivesLoading || isNounsLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-primaryText'>Загрузка...</p>
          </div>
        ) : isAdjectivesError || isNounsError ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-primaryText'>Ошибка</p>
          </div>
        ) : isNew ? (
          activeRoles?.map((role) => (
            <button
              key={role.id}
              onClick={() => clickRole(role.id)}
              disabled={!isNew}
              className={
                'w-full px-1 text-[#FFF] transition-all' +
                (isActiveRole(role.id) ? ' bg-secondary' : '') +
                (isNew ? ' cursor-pointer hover:bg-secondary' : ' cursor-default')
              }
            >
              {role.title}
            </button>
          ))
        ) : (
          activeRoles
            ?.filter((role) => role.id === roles?.adjective || role.id === roles?.noun)
            .map((role) => (
              <button key={role.id} disabled className={'w-full px-1 text-[#FFF] transition-all'}>
                {role.title}
              </button>
            ))
        )}
      </div>
    </div>
  )
}

export default RoleAward
