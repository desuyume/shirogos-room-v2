import { IMangaPage } from '@/types/manga.interface'
import { IStoryPage } from '@/types/story.interface'
import { ICharacterBlocks } from '@/types/wiki.interface'
import { getAdminWikitekaColor } from '@/utils/wikitekaColors'
import { FC } from 'react'

interface IEditorBlocks {
  blocks: ICharacterBlocks | IMangaPage[] | IStoryPage[]
  setSelectedBlock: React.Dispatch<React.SetStateAction<any>>
  setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}

const EditorBlocks: FC<IEditorBlocks> = ({
  blocks,
  setSelectedBlock,
  setIsEditorVisible,
  title
}) => {
  return (
    <div className='relative mb-5 box-content flex h-[3.8125rem] w-full border-[5px] border-primary bg-secondary last-of-type:mb-0'>
      <div className='flex h-full w-[38%] items-center justify-center bg-tertiary'>
        <p className='text-center text-[1.5625rem] leading-none text-[#FFF]'>{title}</p>
      </div>
      <div className='absolute right-0 flex h-full w-[62%] overflow-x-auto overflow-y-hidden'>
        {blocks.map((block, index) => (
          <button
            key={block.id}
            onClick={() => {
              setSelectedBlock(block)
              setIsEditorVisible(true)
            }}
            style={{ backgroundColor: getAdminWikitekaColor(index + 1) }}
            className='bg-green-800 hover:bg-green-700 flex h-full min-w-[4.5625rem] max-w-[4.5625rem] items-center justify-center font-secondary text-[2.1875rem] font-bold text-[#FFF] transition-all'
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedBlock(null)
            setIsEditorVisible(true)
          }}
          className='flex h-full min-w-[4.5625rem] max-w-[4.5625rem] items-center justify-center text-[2.5rem] leading-none text-[#FFF] transition-all hover:text-opacity-70'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default EditorBlocks
