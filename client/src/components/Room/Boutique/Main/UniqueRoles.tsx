import { FC, useContext, useState } from 'react'
import { useBoutiqueUniqueRoles } from '@/api/useBoutiqueUniqueRoles'
import UniqueRoleItem from './UniqueRoleItem'
import { RoomAppearanceContext } from '@/Context'
import { colorVariantsMediumTablet } from '@/consts/roomColors'

const UniqueRoles: FC = () => {
  const [visibleRole, setVisibleRole] = useState<string>('adjective')
  const roomAppearance = useContext(RoomAppearanceContext)

  const { data: roles, isLoading, isError } = useBoutiqueUniqueRoles()

  return (
    <div
      className={`${
        colorVariantsMediumTablet.bg[roomAppearance.active_room_color]
      } flex h-[20.0625rem] w-full items-center rounded-b-[2.3125rem] bg-tertiary`}
    >
      <div className='mb-4 hidden h-[8rem] items-center justify-center border-[8.5rem] border-l-[15rem] border-transparent border-l-tertiary laptop:flex'>
        <p className='absolute left-[1.12rem] w-[10.5rem] text-[1.5625rem] leading-[97.795%] text-primaryText'>
          Уголок уникальных ролей
        </p>
      </div>
      <div className='relative flex h-full w-full justify-evenly rounded-b-[2.3125rem] laptop:-ml-[12rem]'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-primaryText'>Загрузка...</p>
          </div>
        ) : isError ? (
          <div className='flex h-full w-full items-center justify-center'>
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
                visibleRole === 'adjective' ? setVisibleRole('noun') : setVisibleRole('adjective')
              }
              className='absolute right-3 top-3 z-30 h-8 w-8 rounded-[2.3125rem] bg-[#EBE984] fullhd:hidden'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default UniqueRoles
