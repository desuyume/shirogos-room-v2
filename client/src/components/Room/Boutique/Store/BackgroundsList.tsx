import { FC } from 'react'
import { IBackground } from '@/types/background.interface'
import { Scrollbar } from 'react-scrollbars-custom'
import BackgroundItem from './BackgroundItem'

interface IBackgroundsList {
	backgrounds: IBackground[]
	buyedBackgrounds: IBackground[]
	activeBg: IBackground | null
	setActiveBg: React.Dispatch<React.SetStateAction<IBackground | null>>
}

const BackgroundsList: FC<IBackgroundsList> = ({
	backgrounds,
	buyedBackgrounds,
	activeBg,
	setActiveBg,
}) => {
	return (
		<Scrollbar noDefaultStyles className='w-full flex-1'>
			<div className='flex-1 flex flex-col items-center w-full'>
				{backgrounds.map(bg => (
					<BackgroundItem
						key={bg.id}
						background={bg}
						buyedBackgrounds={buyedBackgrounds}
						activeBg={activeBg}
						setActiveBg={setActiveBg}
					/>
				))}
			</div>
		</Scrollbar>
	)
}

export default BackgroundsList
