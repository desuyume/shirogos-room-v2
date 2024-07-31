import { FC, useEffect, useState } from 'react'
import { useUpdateMiniatureImg } from '@/api/useUpdateMiniatureImg'
import CropModal from '@/components/CropModal'

interface IChangeMiniature {
	isDisabled: boolean
	profileImg: string | null
}

const ChangeMiniature: FC<IChangeMiniature> = ({ profileImg, isDisabled }) => {
	const [isMiniauteModalVisible, setIsMiniauteModalVisible] =
		useState<boolean>(false)

	const { mutate: updateMiniature, isSuccess: isSuccessUpdate } =
		useUpdateMiniatureImg()

	const saveToServer = (file: File) => {
		const data = new FormData()
		data.append('img', file)
		updateMiniature(data)
	}

	useEffect(() => {
		if (isSuccessUpdate) {
			setIsMiniauteModalVisible(false)
		}
	}, [isSuccessUpdate])

	return (
		<>
			<button
				onClick={() => setIsMiniauteModalVisible(true)}
				className={
					(isDisabled ? 'hidden ' : 'block ') +
					'w-full bg-secondaryHover h-[3.1875rem] text-xl text-primaryText hover:text-white mb-[0.62rem] hover:bg-secondary transition-all'
				}
			>
				Изменить миниатюру
			</button>
			<CropModal
				aspect={5 / 4}
				img={profileImg}
				isVisible={isMiniauteModalVisible}
				setIsVisible={setIsMiniauteModalVisible}
				saveToServerFn={saveToServer}
			/>
		</>
	)
}

export default ChangeMiniature
