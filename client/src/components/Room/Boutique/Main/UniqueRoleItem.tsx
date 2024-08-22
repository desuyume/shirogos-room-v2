import { FC, useContext } from 'react'
import adjectiveImg from '@/assets/room/adjective.png'
import nounImg from '@/assets/room/noun.png'
import { IUniqueRole } from '@/types/unique-role.interface'
import { useBuyUniqueRole } from '@/api/useBuyUniqueRole'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
import { cn } from '@/utils/cn'

interface IUniqueRoleItem {
  visibleRole: string
  type: string
  role: IUniqueRole | null
  isBuyed: boolean
}

const UniqueRoleItem: FC<IUniqueRoleItem> = ({ visibleRole, type, role, isBuyed }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate, isSuccess: isBuySucces, error } = useBuyUniqueRole(type)

  const clickBuy = () => {
    if (role) {
      mutate({ uniqueRoleId: role.id })
    }
  }

  useToastOnSuccess(isBuySucces, successBuyToast)
  useToastOnError(error, notEnoughDangoToast)

  return (
    <div
      className={
        (visibleRole === type ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute z-10 flex h-full w-[34rem] justify-center fullhd:visible fullhd:relative fullhd:opacity-100'
      }
    >
      <div className='absolute bottom-0 -z-10 hidden h-0 w-0 border-[17rem] border-b-[27.5rem] border-t-0 border-transparent border-b-tertiary medium-tablet:block' />
      <img
        className='pointer-events-none absolute -left-[3.5rem] top-[1.96rem] hidden medium-tablet:block'
        src={type === 'adjective' ? adjectiveImg : nounImg}
        alt='role-img'
      />
      <div className='flex w-[14.78369rem] flex-col items-center'>
        <div className='mb-[1.66rem] mt-[3.25rem] flex flex-col items-center'>
          <p className='text-[0.9375rem] leading-[97.795%] text-primaryText'>
            {type === 'adjective' ? 'ПРИЛАГАТЕЛЬНОЕ' : 'СУЩЕСТВИТЕЛЬНОЕ'}
          </p>
          <p className='text-[2.8125rem] leading-[97.795%] text-primaryText'>ДНЯ</p>
        </div>
        <div className='mb-11 flex h-[4.44775rem] w-[14.78369rem] flex-col items-center justify-center rounded-[1.5625rem] bg-secondaryHover'>
          {!role ? (
            <p className='pl-10 text-center leading-none text-primaryText'>
              Нет <br /> доступной роли
            </p>
          ) : (
            <>
              <p className='text-[1.5625rem] leading-[97.795%] text-primaryText'>{role?.title}</p>
              <p className='text-[0.9375rem] leading-[97.795%] text-[#EBE984]'>{role?.cost} ДО</p>
            </>
          )}
        </div>
        {isBuyed ? (
          <p className='self-end text-xl text-primaryText'>Куплено</p>
        ) : (
          <button
            onClick={clickBuy}
            disabled={!role}
            className={cn(
              `${colorVariants.bg[roomAppearance.active_room_color]} ${
                colorVariantsHover.bg[roomAppearance.active_room_color]
              } h-[2.75rem] w-[6.32rem] self-end rounded-br-[1.2rem] text-xl text-primaryText transition-all disabled:bg-secondary disabled:text-opacity-80`,
              {
                'hover:text-white': !!role
              }
            )}
          >
            Купить
          </button>
        )}
      </div>
    </div>
  )
}

export default UniqueRoleItem
