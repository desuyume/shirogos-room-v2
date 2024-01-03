import { FC, useState } from 'react'
import MiniatureModal from './MiniatureModal'

interface IChangeMiniature {
	isDisabled: boolean
	profileImg: string | null
}

const ChangeMiniature: FC<IChangeMiniature> = ({ profileImg, isDisabled }) => {
	const [isMiniauteModalVisible, setIsMiniauteModalVisible] =
		useState<boolean>(false)

	return (
		<>
			<button
				onClick={() => setIsMiniauteModalVisible(true)}
				className={(isDisabled ? 'hidden ' : 'block ') + 'w-full bg-secondaryHover h-[3.1875rem] text-xl text-primaryText mb-[0.62rem] hover:bg-secondary transition-all'}
			>
				Изменить миниатюру
			</button>
			<MiniatureModal
				profileImg={profileImg}
				isVisible={isMiniauteModalVisible}
				setIsVisible={setIsMiniauteModalVisible}
			/>
		</>
	)
}

export default ChangeMiniature
