import TextEditor from '@/components/TextEditor'
import { storyPageEditorOptions } from '@/consts/reactQuillOptions'
import { IStoryPage } from '@/types/story.interface'
import { FC, useEffect, useState } from 'react'

interface IStoryPageEditor {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  selectedPage: IStoryPage | null
  pages: IStoryPage[]
  setPages: React.Dispatch<React.SetStateAction<IStoryPage[]>>
}

const StoryPageEditor: FC<IStoryPageEditor> = ({
  isVisible,
  setIsVisible,
  selectedPage,
  pages,
  setPages
}) => {
  const [text, setText] = useState<string>('')

  const add = () => {
    const prevPage = pages[pages.length - 1]

    if (!!prevPage) {
      setPages([...pages, { id: prevPage.id + 1, text, page_num: prevPage.page_num + 1 }])
    } else {
      setPages([{ id: 1, text, page_num: 1 }])
    }

    setIsVisible(false)
    setText('')
  }

  const update = () => {
    const updatedPages = pages.map((page) => {
      if (page.id === selectedPage?.id) {
        return { ...page, text }
      }
      return page
    })
    setPages(updatedPages)

    setIsVisible(false)
    setText('')
  }

  useEffect(() => {
    if (selectedPage) {
      setText(selectedPage.text)
    } else {
      setText('')
    }
  }, [selectedPage, isVisible])

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'story absolute inset-0 flex h-[60.625rem] w-full justify-center bg-tertiary px-8 pt-[1.94rem] transition-all'
      }
    >
      <button
        onClick={() => setIsVisible(false)}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Назад
      </button>

      <div className='mx-8 flex h-[57.3125rem] flex-1 flex-col items-center justify-center'>
        <div className='relative flex h-full w-full flex-col items-center justify-center border-[5px] border-primary bg-secondary px-[1.625rem] pb-[1.5625rem]'>
          <p className='py-4 text-[1.5625rem] text-[#FFF]'>
            Страница{' '}
            {!!selectedPage
              ? selectedPage.page_num
              : pages.length > 0
              ? pages[pages.length - 1].page_num + 1
              : 1}
          </p>
          <div className='h-full w-full border-[5px] border-primary bg-tertiary'>
            <TextEditor
              value={text}
              setValue={setText}
              toolbarOptions={storyPageEditorOptions.toolbarOptions}
            />
          </div>
        </div>
      </div>

      <button
        onClick={!!selectedPage ? update : add}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        {!!selectedPage ? 'Изменить' : 'Добавить'}
      </button>
    </div>
  )
}

export default StoryPageEditor
