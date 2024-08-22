import { RoomAppearanceContext } from '@/Context'
import { useUpdateUsername } from '@/api/useUpdateUsername'
import { colorVariants, colorVariantsFocus, colorVariantsHover } from '@/consts/roomColors'
import { usernameLengthToast } from '@/utils/toasts'
import { FC, useContext } from 'react'

interface IChangeUsername {
  initialValue: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const ChangeUsername: FC<IChangeUsername> = ({ initialValue, value, setValue }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate } = useUpdateUsername()

  const updateUsername = () => {
    if (value.length < 3 || value.length > 25) {
      usernameLengthToast()
    } else {
      mutate({ username: value })
    }
  }

  return (
    <div className='flex h-[7.75rem] items-center justify-between border-b-[1px] border-[#646464]'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <h3 className='mb-5 text-[1.875rem] leading-[97.795%] text-primaryText'>Никнейм</h3>
        <input
          className={`w-[11.6875rem] border-b-[0.1875rem] bg-transparent px-2 pb-3 outline-none ${
            colorVariants.border[roomAppearance.active_room_color]
          } text-center text-[0.9375rem] leading-[97.795%] text-[#FFF] ${
            colorVariantsFocus.border[roomAppearance.active_room_color]
          } ${colorVariantsHover.border[roomAppearance.active_room_color]} transition-all`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        disabled={initialValue === value}
        className={`h-[85%] w-[8rem] ${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } mr-[2.73rem] text-[0.9375rem] text-primaryText transition-all hover:text-white disabled:bg-secondaryHover hover:disabled:text-primaryText`}
        onClick={updateUsername}
      >
        Сохранить
      </button>
    </div>
  )
}

export default ChangeUsername
