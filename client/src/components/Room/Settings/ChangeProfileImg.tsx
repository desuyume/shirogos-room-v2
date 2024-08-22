import { RoomAppearanceContext } from '@/Context'
import { useUpdateProfileImg } from '@/api/useUpdateProfileImg'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { FC, useContext, useRef } from 'react'

const ChangeProfileImg: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { mutate } = useUpdateProfileImg()

  const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0]
      const contentData = new FormData()
      contentData.append('img', img)
      mutate(contentData)
    }
  }

  return (
    <div className='relative h-[3.9375rem] w-full'>
      <input
        ref={inputRef}
        accept='image/*'
        type='file'
        onChange={(e) => handleChangeProfileImg(e)}
        className='absolute inset-0 h-0 w-0 opacity-0 outline-none'
      />
      <button
        onClick={() => inputRef.current?.click()}
        className={`h-full w-full ${colorVariants.bg[roomAppearance.active_room_color]} ${
          colorVariantsHover.bg[roomAppearance.active_room_color]
        } text-xl text-primaryText transition-all hover:text-white`}
      >
        Изменить аватарку
      </button>
    </div>
  )
}

export default ChangeProfileImg
