import { FC, useEffect, useState } from 'react'
import EditorInput from '../EditorInput'
import EditorBlocks from '../EditorBlocks'
import { IStory, IStoryPage } from '@/types/story.interface'
import EditorImgUpload from '../EditorImgUpload'
import StoryPageEditor from './StoryPageEditor'
import { useCreateStory } from '@/api/useCreateStory'
import { useUpdateStory } from '@/api/useUpdateStory'

interface IStoryEditor {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  selectedStory: IStory | null
}

const StoryEditor: FC<IStoryEditor> = ({ isVisible, setIsVisible, selectedStory }) => {
  const [id, setId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [cover, setCover] = useState<File | null>(null)
  const [coverSrc, setCoverSrc] = useState<string | null>('')

  const [pages, setPages] = useState<IStoryPage[]>([])
  const [selectedPage, setSelectedPage] = useState<IStoryPage | null>(null)

  const [isPageEditorVisible, setIsPageEditorVisible] = useState<boolean>(false)

  const { mutate: createStory, isSuccess: isSuccessCreate } = useCreateStory()
  const { mutate: updateStory, isSuccess: isSuccessUpdate } = useUpdateStory(
    selectedStory?.id ?? null
  )

  const createHandler = () => {
    if (!id) {
      console.log('ID не может быть пустым')
      return
    }

    if (!title) {
      console.log('Название не может быть пустым')
      return
    }

    if (!cover) {
      console.log('Обложка не может быть пустой')
      return
    }

    const formData = new FormData()

    formData.append('id', id)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('coverImg', cover)
    formData.append('pages', JSON.stringify(pages))

    createStory(formData)
  }

  const updateHandler = () => {
    if (!id) {
      console.log('ID не может быть пустым')
      return
    }

    if (!title) {
      console.log('Название не может быть пустым')
      return
    }

    const formData = new FormData()

    formData.append('id', id)
    formData.append('title', title)
    formData.append('description', description)
    if (cover) {
      formData.append('coverImg', cover)
    }
    formData.append('pages', JSON.stringify(pages))

    updateStory(formData)
  }

  const setFields = (story: IStory) => {
    setId(story.id)
    setTitle(story.title)
    setDescription(story.description ?? '')
    setCover(null)
    setCoverSrc(story.cover_img)
    setPages(story.pages)
  }

  const clearFields = () => {
    setId('')
    setTitle('')
    setDescription('')
    setCover(null)
    setCoverSrc(null)
    setPages([])
  }

  useEffect(() => {
    if (selectedStory) {
      setFields(selectedStory)
    } else {
      clearFields()
    }
  }, [isVisible])

  useEffect(() => {
    if (isSuccessCreate || isSuccessUpdate) {
      setIsVisible(false)
    }
  }, [isSuccessCreate, isSuccessUpdate])

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute inset-0 top-[5.25rem] z-20 flex h-[60.625rem] w-full justify-center border-t-[1px] border-t-primary bg-tertiary px-8 pt-[1.94rem] transition-all'
      }
    >
      <button
        onClick={() => setIsVisible(false)}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Назад
      </button>
      <div className='mx-8 flex h-[57.3125rem] flex-1 flex-col items-center justify-between'>
        <div className='mt-[-5px] flex h-[50rem] w-full flex-col items-center border-[5px] border-primary bg-secondary'>
          <EditorInput title='ID рассказа' state={id} setState={setId} type='story-id' />
          <EditorInput
            title='Название рассказа'
            state={title}
            setState={setTitle}
            type='story-title'
          />
          <EditorInput
            title='Описание'
            state={description}
            setState={setDescription}
            type='story-description'
            isTextarea
          />
          <EditorImgUpload
            title='Обложка'
            img={cover}
            imgSrc={coverSrc}
            setImg={setCover}
            className='mt-12 h-[25rem]'
          />
        </div>
        <EditorBlocks
          title='Страницы'
          blocks={pages}
          setSelectedBlock={setSelectedPage}
          setIsEditorVisible={setIsPageEditorVisible}
        />
      </div>
      <button
        onClick={!!selectedStory ? updateHandler : createHandler}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        {!!selectedStory ? 'Изменить' : 'Добавить'}
      </button>

      <StoryPageEditor
        isVisible={isPageEditorVisible}
        setIsVisible={setIsPageEditorVisible}
        selectedPage={selectedPage}
        pages={pages}
        setPages={setPages}
      />
    </div>
  )
}

export default StoryEditor
