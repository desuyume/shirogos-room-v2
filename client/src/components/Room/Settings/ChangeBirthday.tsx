import { DatePickerInput, DatesProvider } from '@mantine/dates'
import { FC, useContext } from 'react'
import '@/styles/date-picker.scss'
import 'dayjs/locale/ru'
import { useUpdateBirthday } from '@/api/useUpdateBirthday'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'

interface IChangeBirthday {
  initialValue: Date | null
  value: Date | null
  setValue: React.Dispatch<React.SetStateAction<Date | null>>
}

const ChangeBirthday: FC<IChangeBirthday> = ({ initialValue, value, setValue }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate } = useUpdateBirthday()

  const updateBirthday = () => {
    mutate({ birthday: value })
  }

  const isDatesEqual = (): boolean => {
    if (!!initialValue && !!value) {
      const initialDate = new Date(initialValue)
      return initialDate.toDateString() === value.toDateString()
    }

    if (!initialValue && !!value) {
      return false
    }

    return true
  }

  return (
    <div className='flex h-[7.75rem] items-center justify-between border-b-[1px] border-[#646464]'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <h3 className='mb-5 text-[1.875rem] leading-[97.795%] text-primaryText'>День рождения</h3>
        <DatesProvider
          settings={{
            locale: 'ru'
          }}
        >
          <DatePickerInput
            className={`w-[11.6875rem] border-b-[0.1875rem] bg-transparent ${
              colorVariants.border[roomAppearance.active_room_color]
            } ${colorVariantsHover.border[roomAppearance.active_room_color]} transition-all ${
              roomAppearance.active_room_color
            }-datepicker`}
            value={value}
            onChange={setValue}
            hideWeekdays
            placeholder='не указано'
          />
        </DatesProvider>
      </div>
      <button
        disabled={isDatesEqual()}
        className={`h-[85%] w-[8rem] ${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } mr-[2.73rem] text-[0.9375rem] text-primaryText transition-all hover:text-white disabled:bg-secondaryHover hover:disabled:text-primaryText`}
        onClick={updateBirthday}
      >
        Сохранить
      </button>
    </div>
  )
}

export default ChangeBirthday
