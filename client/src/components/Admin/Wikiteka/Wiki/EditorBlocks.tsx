import { IMangaPage } from '@/types/manga.interface'
import { ICharacterBlocks } from '@/types/wiki.interface'
import { getAdminWikitekaColor } from '@/utils/wikitekaColors'
import { FC } from 'react'

interface IEditorBlocks {
	blocks: ICharacterBlocks | IMangaPage[]
	setSelectedBlock: React.Dispatch<React.SetStateAction<any>>
	setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
	title: string
}

const EditorBlocks: FC<IEditorBlocks> = ({
	blocks,
	setSelectedBlock,
	setIsEditorVisible,
	title,
}) => {
	return (
		<div className='w-full h-[3.8125rem] border-[5px] box-content border-primary bg-secondary mb-5 last-of-type:mb-0 flex'>
			<div className='w-[38%] h-full bg-tertiary flex justify-center items-center'>
				<p className='text-[#FFF] text-[1.5625rem] text-center leading-none'>
					{title}
				</p>
			</div>
			<div className='flex-1 h-full flex overflow-x-auto overflow-y-hidden'>
				{blocks.map((block, index) => (
					<button
						key={block.id}
						onClick={() => {
							setSelectedBlock(block)
							setIsEditorVisible(true)
						}}
						style={{ backgroundColor: getAdminWikitekaColor(index + 1) }}
						className='min-w-[4.5625rem] h-full bg-green-800 hover:bg-green-700 transition-all flex justify-center items-center text-[#FFF] font-secondary font-bold text-[2.1875rem]'
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => {
						setSelectedBlock(null)
						setIsEditorVisible(true)
					}}
					className='min-w-[4.5625rem] h-full transition-all flex justify-center items-center text-[#FFF] hover:text-opacity-70 text-[2.5rem] leading-none'
				>
					+
				</button>
			</div>
		</div>
	)
}

export default EditorBlocks
