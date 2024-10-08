import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { IPastUsername, IRoomAppearance } from '@/types/room.interface'
import { formatDate } from '@/utils/formatDate'
import { getHexRoomColorByName } from '@/utils/getRoomColorByName'
import { FC, useContext } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface IPastUsernames {
  isVisible: boolean
  usernames?: IPastUsername[]
  className?: string
  isGuide?: boolean
  guideRoomAppearance?: IRoomAppearance
}

const PastUsernames: FC<IPastUsernames> = ({
  isVisible,
  usernames,
  className,
  isGuide,
  guideRoomAppearance
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'past_usernames absolute z-50 flex h-[114px] w-[13.6875rem] flex-col pt-2.5 transition-all ' +
        className
      }
    >
      <svg
        width='234'
        height='136'
        viewBox='0 22 234 136'
        fill='none'
        className='absolute inset-0 -z-10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M158.295 38.5684L211.453 22.6505L193.336 75.3007L158.295 38.5684Z'
          fill='#242424'
          stroke={
            isGuide
              ? `${getHexRoomColorByName(guideRoomAppearance?.active_room_color ?? 'pink')}`
              : `${getHexRoomColorByName(roomAppearance.active_room_color)}`
          }
        />
        <rect
          x='0.5'
          y='31.5'
          width='218'
          height='104'
          fill='#242424'
          stroke={
            isGuide
              ? `${getHexRoomColorByName(guideRoomAppearance?.active_room_color ?? 'pink')}`
              : `${getHexRoomColorByName(roomAppearance.active_room_color)}`
          }
        />
        <path
          d='M209.826 25.0333L192.593 76.4247L158.813 42.8153L209.826 25.0333Z'
          fill='#242424'
        />
        <path d='M205.128 25.316L185.939 75.1377L154.153 40.5837L205.128 25.316Z' fill='#242424' />
      </svg>
      <div
        className={
          `z-50 flex h-[1.625rem] w-full items-center justify-center border-b-[1px] ` +
          (isGuide
            ? `${colorVariants.border[guideRoomAppearance?.active_room_color ?? 'pink']}`
            : `${colorVariants.border[roomAppearance.active_room_color]}`)
        }
      >
        <p className='text-center text-[0.875rem] text-primaryText'>Предыдущие никнеймы</p>
      </div>
      {usernames?.length ? (
        <Scrollbar noDefaultStyles className='my-0.5' style={{ height: '100%' }}>
          <div className='w-full flex-1 pl-2 pr-3.5'>
            {usernames?.map((username) => (
              <div key={username.id} className='flex w-full items-center justify-between'>
                <p
                  className={
                    (isGuide
                      ? `${
                          colorVariants.text[guideRoomAppearance?.active_username_color ?? 'pink']
                        } `
                      : `${colorVariants.text[roomAppearance.active_username_color]} `) +
                    `max-w-[9.2rem] overflow-hidden overflow-ellipsis whitespace-nowrap font-secondary text-xs font-bold leading-[123.295%]`
                  }
                >
                  {username.username}
                </p>
                <p className='font-secondary text-[0.5625rem] font-bold leading-[169.295%] text-primaryText'>
                  {formatDate(username.created_at)}
                </p>
              </div>
            ))}
          </div>
        </Scrollbar>
      ) : (
        <div className='flex w-full flex-1 items-center justify-center'>
          <p className='text-primaryText'>ИХ НЕТ 0_0</p>
        </div>
      )}
    </div>
  )
}

export default PastUsernames
