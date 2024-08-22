import { RoomAppearanceContext } from '@/Context'
import { useUpdateGender } from '@/api/useUpdateGender'
import { colorVariantsDisabled } from '@/consts/roomColors'
import { FC, useContext } from 'react'

interface IChangeGender {
  gender: string
  setGender: React.Dispatch<React.SetStateAction<string>>
}

const ChangeGender: FC<IChangeGender> = ({ gender, setGender }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate } = useUpdateGender()

  const handleChangeGender = (gender: string) => {
    setGender(gender)
    mutate({ gender })
  }

  return (
    <div className='flex h-[7.75rem] flex-col items-center justify-center border-b-[1px] border-[#646464]'>
      <h3 className='mb-1 text-[1.875rem] leading-[97.795%] text-primaryText'>Пол</h3>
      <div className='flex w-full justify-around'>
        <button
          onClick={() => handleChangeGender('MALE')}
          disabled={gender === 'MALE'}
          className={`h-[2.4375rem] w-[20.8%] bg-transparent text-xl text-primaryText hover:bg-secondaryHover hover:text-white disabled:text-white ${
            colorVariantsDisabled.bg[roomAppearance.active_room_color]
          } transition-all`}
        >
          Мужской
        </button>
        <button
          onClick={() => handleChangeGender('FEMALE')}
          disabled={gender === 'FEMALE'}
          className={`h-[2.4375rem] w-[20.8%] bg-transparent text-xl text-primaryText hover:bg-secondaryHover hover:text-white disabled:text-white ${
            colorVariantsDisabled.bg[roomAppearance.active_room_color]
          } transition-all`}
        >
          Женский
        </button>
      </div>
    </div>
  )
}

export default ChangeGender
