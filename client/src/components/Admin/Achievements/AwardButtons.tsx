import { AwardType } from '@/types/achievements.interface'
import { FC } from 'react'

interface IAwardButtons {
	awardType: AwardType[]
	selectedAwardType: AwardType | null
	setSelectedAwardType: React.Dispatch<React.SetStateAction<AwardType | null>>
}

const AwardButtons: FC<IAwardButtons> = ({
	awardType,
	selectedAwardType,
	setSelectedAwardType,
}) => {
	return (
		<div className='flex'>
			<button
				disabled={!awardType.includes('badge')}
				onClick={() =>
					selectedAwardType === 'badge'
						? setSelectedAwardType(null)
						: setSelectedAwardType('badge')
				}
				className={
					(awardType.includes('badge') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'badge' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('background')}
				onClick={() =>
					selectedAwardType === 'background'
						? setSelectedAwardType(null)
						: setSelectedAwardType('background')
				}
				className={
					(awardType.includes('background') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'background' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('unique-role')}
				onClick={() =>
					selectedAwardType === 'unique-role'
						? setSelectedAwardType(null)
						: setSelectedAwardType('unique-role')
				}
				className={
					(awardType.includes('unique-role') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'unique-role' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('experience')}
				onClick={() =>
					selectedAwardType === 'experience'
						? setSelectedAwardType(null)
						: setSelectedAwardType('experience')
				}
				className={
					(awardType.includes('experience') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'experience' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('frame')}
				onClick={() =>
					selectedAwardType === 'frame'
						? setSelectedAwardType(null)
						: setSelectedAwardType('frame')
				}
				className={
					(awardType.includes('frame') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'frame' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				onClick={() =>
					selectedAwardType === 'achieve-bg'
						? setSelectedAwardType(null)
						: setSelectedAwardType('achieve-bg')
				}
				className={
					(awardType.includes('achieve-bg') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'achieve-bg' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
		</div>
	)
}

export default AwardButtons
