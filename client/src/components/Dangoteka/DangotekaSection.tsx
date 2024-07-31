import { FC } from 'react'
import DangotekaSectionList from './DangotekaSectionList'
import { cn } from '@/utils/cn'

export type DangotekaItemType = 'manga' | 'story'

interface IDangotekaSection {
	title: string
	type: DangotekaItemType
}

const DangotekaSection: FC<IDangotekaSection> = ({ title, type }) => {
	return (
		<div>
			<h2
				className={cn(
					'text-primaryText text-[1.5625rem] h-[2.125rem] flex justify-center items-center',
					{
						'bg-secondary': type === 'manga',
						'bg-primary': type === 'story',
					}
				)}
			>
				{title}
			</h2>
			<DangotekaSectionList type={type} />
		</div>
	)
}

export default DangotekaSection
