import { FC } from 'react'

interface IAwardButtons { 
	awardType: string[]
	selectedAwardType: string | null
	setSelectedAwardType: React.Dispatch<React.SetStateAction<string | null>>
}

const AwardButtons: FC<IAwardButtons> = ({ awardType, selectedAwardType, setSelectedAwardType }) => {
	return (
		<div className='flex'>
			<button
				disabled={!awardType.includes('badge')}
				onClick={() => setSelectedAwardType('badge')}
				className={
					(awardType.includes('badge') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'badge' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('background')}
				onClick={() => setSelectedAwardType('background')}
				className={
					(awardType.includes('background') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'background' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('unique-role')}
				onClick={() => setSelectedAwardType('unique-role')}
				className={
					(awardType.includes('unique-role') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'unique-role' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
			<button
				disabled={!awardType.includes('experience')}
				onClick={() => setSelectedAwardType('experience')}
				className={
					(awardType.includes('experience') ? 'hover:bg-primary ' : '') +
					(selectedAwardType === 'experience' ? 'bg-primary ' : '') +
					'w-1/4 h-4 border-[1px] border-primary transition-all disabled:border-secondary'
				}
			/>
		</div>
	)
}

export default AwardButtons
