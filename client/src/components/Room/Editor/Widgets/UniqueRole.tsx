import { FC, useEffect, useState } from 'react'
import uniqueRoleBgImg from '@/assets/room/unique-role-editor.png'
import { useUserUniqueRoles } from '@/api/useUserUniqueRoles'
import { IUserUniqueRoles } from '@/types/room.interface'

interface IUniqueRole {
  isGuide?: boolean
  guideUniqueRoles?: IUserUniqueRoles
}

const UniqueRole: FC<IUniqueRole> = ({ isGuide, guideUniqueRoles }) => {
  const [isRolesEmpty, setIsRolesEmpty] = useState<boolean>(false)

  const { data: roles, isLoading, isError } = useUserUniqueRoles(!isGuide)

  useEffect(() => {
    if (isGuide) {
      if (
        !guideUniqueRoles?.selected_unique_role_adjective &&
        !guideUniqueRoles?.selected_unique_role_noun
      ) {
        setIsRolesEmpty(true)
      } else {
        setIsRolesEmpty(false)
      }
      return
    }

    if (!isLoading && !isError) {
      if (!roles?.selected_unique_role_adjective && !roles?.selected_unique_role_noun) {
        setIsRolesEmpty(true)
      } else {
        setIsRolesEmpty(false)
      }
    }
  }, [isLoading, isError, roles, isGuide, guideUniqueRoles])

  return (
    <>
      <div className='handle relative flex h-full w-full items-center justify-center'>
        <img
          className='pointer-events-none h-full w-full'
          src={uniqueRoleBgImg}
          alt='unique-role'
        />
        <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center'>
          {isLoading && !isGuide ? (
            <p className='text-center text-[1.4vw] leading-none text-tertiary'>Загрузка...</p>
          ) : isError && !isGuide ? (
            <p className='text-center text-[1.4vw] leading-none text-tertiary'>Ошибка</p>
          ) : isRolesEmpty ? (
            <>
              <p className='pointer-events-none text-center text-[1.4vw] leading-none text-tertiary'>
                Роль не
              </p>
              <p className='pointer-events-none text-center text-[1.4vw] leading-none text-tertiary'>
                выбрана
              </p>
            </>
          ) : (
            <>
              <p className='pointer-events-none text-center text-[1.4vw] leading-none text-tertiary'>
                {isGuide && guideUniqueRoles?.selected_unique_role_adjective
                  ? guideUniqueRoles.selected_unique_role_adjective
                  : !isGuide && roles?.selected_unique_role_adjective
                  ? roles.selected_unique_role_adjective
                  : ''}
              </p>
              <p className='pointer-events-none text-center text-[1.4vw] leading-none text-tertiary'>
                {isGuide && guideUniqueRoles?.selected_unique_role_noun
                  ? guideUniqueRoles.selected_unique_role_noun
                  : !isGuide && roles?.selected_unique_role_noun
                  ? roles.selected_unique_role_noun
                  : ''}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default UniqueRole
