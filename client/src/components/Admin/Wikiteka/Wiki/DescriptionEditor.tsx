import TextEditor from '@/components/TextEditor'
import { characterDescriptionEditorOptions } from '@/consts/reactQuillOptions'
import { IDescription } from '@/types/wiki.interface'
import { FC, useEffect, useState } from 'react'

interface IDescriptionEditor {
  selectedBlock: IDescription | null
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setBlocks: React.Dispatch<React.SetStateAction<IDescription[]>>
}

const DescriptionEditor: FC<IDescriptionEditor> = ({
  selectedBlock,
  isVisible,
  setIsVisible,
  setBlocks
}) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const addBlock = () => {
    if (!title || !description) {
      console.log('fill all fields')
      return
    }

    setBlocks((prev) => [...prev, { id: prev.length + 1, title, description }])
    setIsVisible(false)
    setTitle('')
    setDescription('')
  }

  const editBlock = () => {
    if (!title || !description) {
      console.log('fill all fields')
      return
    }

    setBlocks((prev) =>
      prev.map((block) =>
        block.id === selectedBlock?.id ? { ...block, title, description } : block
      )
    )
    setIsVisible(false)
  }

  const removeBlock = () => {
    setBlocks((prev) => prev.filter((block) => block.id !== selectedBlock?.id))
    setIsVisible(false)
  }

  const goBack = () => {
    if (selectedBlock) {
      setTitle(selectedBlock.title)
      setDescription(selectedBlock.description)
    }

    setIsVisible(false)
  }

  useEffect(() => {
    if (selectedBlock) {
      setTitle(selectedBlock.title)
      setDescription(selectedBlock.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [selectedBlock])

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute inset-0 flex h-[60.625rem] w-full justify-center border-t-[1px] border-t-primary bg-tertiary px-8 pt-[1.94rem] transition-all'
      }
    >
      <button
        onClick={goBack}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Назад
      </button>

      <div className='mx-8 h-full flex-1'>
        <div className='relative flex h-[57.3125rem] w-full flex-col items-center justify-center border-[5px] border-primary bg-secondary'>
          <div className='mb-5 flex h-[15.375rem] w-[77.5%] border-[5px] border-tertiary'>
            <div className='flex h-full w-[35%] items-center justify-center bg-tertiary'>
              <p className='text-center text-[1.5625rem] text-[#FFF]'>Название</p>
            </div>
            <div className='h-full flex-1'>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Описание'
                className='h-full w-full bg-transparent px-4 text-center text-[1.5625rem] text-[#A3A3A3] outline-none placeholder:text-[#A3A3A3]'
              />
            </div>
          </div>
          <div className='mb-5 flex h-[30.5625rem] w-[94%] border-[5px] border-tertiary'>
            <div className='flex h-full w-[28.8%] items-center justify-center bg-tertiary'>
              <p className='text-center text-[1.5625rem] text-[#FFF]'>Описание</p>
            </div>
            <div className='h-full flex-1'>
              <TextEditor
                value={description}
                setValue={setDescription}
                toolbarOptions={characterDescriptionEditorOptions.toolbarOptions}
              />
            </div>
          </div>

          <button
            onClick={removeBlock}
            className={
              (!!selectedBlock ? 'block ' : 'hidden ') +
              'absolute bottom-8 h-[1.5625rem] w-[16.3125rem] bg-[#FF0000] text-[1.5625rem] leading-[1.5625rem] text-[#FFF] transition-all hover:bg-opacity-60'
            }
          >
            Удалить
          </button>
        </div>
      </div>

      <button
        onClick={!!selectedBlock ? editBlock : addBlock}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        {!!selectedBlock ? 'Изменить' : 'Добавить'}
      </button>
    </div>
  )
}

export default DescriptionEditor
