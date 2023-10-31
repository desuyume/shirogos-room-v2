import { useUpdateProfileImg } from '@/api/useUpdateProfileImg'
import { FC, useRef } from 'react'

const ChangeProfileImg: FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { mutate } = useUpdateProfileImg()

	const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const img = e.target.files[0]
			const contentData = new FormData()
			contentData.append('img', img)
			mutate(contentData)
		} else {
			console.log('img is required')
		}
	}

	return (
		<div className='w-full h-[3.9375rem] relative group'>
			<input
				ref={inputRef}
				accept='image/*'
				type='file'
				onChange={e => handleChangeProfileImg(e)}
				className='outline-none absolute inset-0 opacity-0 w-0 h-0'
			/>
			<button
				onClick={() => inputRef.current?.click()}
				className='w-full h-full bg-primary text-primaryText text-xl hover:bg-primaryHover transition-all group-hover:bg-primaryHover'
			>
				Изменить аватарку
			</button>
		</div>
	)
}

export default ChangeProfileImg
