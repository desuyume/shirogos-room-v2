import { useRoles } from '@/api/useRoles'
import { UniqueRoleType } from '@/types/unique-role.interface'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import RoleItem from './RoleItem'

const RoleSection: FC = () => {
  const {
    data: adjectives,
    isLoading: isAdjectivesLoading,
    isError: isAdjectivesError
  } = useRoles(UniqueRoleType.ADJECTIVES)
  const {
    data: nouns,
    isLoading: isNounsLoading,
    isError: isNounsError
  } = useRoles(UniqueRoleType.NOUNS)

  return (
    <div className='unique-roles-admin flex h-[50.25rem] w-[93.3125rem] justify-between'>
      <div className='h-full w-[37.3125rem] bg-secondary'>
        <div className='flex h-11 w-full items-center bg-tertiary'>
          <div className='flex h-full w-[27.5%] items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Продаем?</p>
          </div>
          <div className='flex h-full w-[33%] items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Цена, до</p>
          </div>
          <div className='flex h-full flex-1 items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Прилагательное</p>
          </div>
        </div>
        <Scrollbar noDefaultStyles className='w-[45.0625rem]' style={{ height: '47.5rem' }}>
          {isAdjectivesLoading ? (
            <div className='flex h-full w-full items-center justify-center'>
              <p className='text-xl text-[#FFF]'>Загрузка...</p>
            </div>
          ) : isAdjectivesError ? (
            <div className='flex h-full w-full items-center justify-center'>
              <p className='text-xl text-[#FFF]'>Ошибка</p>
            </div>
          ) : (
            <>
              {adjectives.map((adjective) => (
                <RoleItem key={adjective.id} role={adjective} type={UniqueRoleType.ADJECTIVES} />
              ))}
              <RoleItem type={UniqueRoleType.ADJECTIVES} isNew />
            </>
          )}
        </Scrollbar>
      </div>
      <div className='h-full w-[37.3125rem] bg-secondary'>
        <div className='flex h-11 w-full items-center bg-tertiary'>
          <div className='flex h-full w-[27.5%] items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Продаем?</p>
          </div>
          <div className='flex h-full w-[33%] items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Цена, до</p>
          </div>
          <div className='flex h-full flex-1 items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Существительное</p>
          </div>
        </div>
        <Scrollbar noDefaultStyles className='w-[45.0625rem]' style={{ height: '47.5rem' }}>
          {isNounsLoading ? (
            <div className='flex h-full w-full items-center justify-center'>
              <p className='text-xl text-[#FFF]'>Загрузка...</p>
            </div>
          ) : isNounsError ? (
            <div className='flex h-full w-full items-center justify-center'>
              <p className='text-xl text-[#FFF]'>Ошибка</p>
            </div>
          ) : (
            <>
              {nouns.map((noun) => (
                <RoleItem key={noun.id} role={noun} type={UniqueRoleType.NOUNS} />
              ))}
              <RoleItem type={UniqueRoleType.NOUNS} isNew />
            </>
          )}
        </Scrollbar>
      </div>
    </div>
  )
}

export default RoleSection
