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
		<div className='w-full h-[3.9375rem] relative'>
			<input
				ref={inputRef}
				accept='image/*'
				type='file'
				onChange={e => handleChangeProfileImg(e)}
				className='outline-none absolute inset-0 opacity-0 w-0 h-0'
			/>
			<button
				onClick={() => inputRef.current?.click()}
				className={`w-full h-full ${
					colorVariants.bg[roomAppearance.active_room_color]
				} ${
					colorVariantsHover.bg[roomAppearance.active_room_color]
				} text-primaryText hover:text-white text-xl transition-all`}
			>
				Изменить аватарку
			</button>
		</div>
	)
}

export default ChangeProfileImg
