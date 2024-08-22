import { FC, useEffect, useState } from 'react'
import MangaEditorImgUpload from '../EditorImgUpload'
import { IMangaPage } from '@/types/manga.interface'

interface IMangaPageEditor {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  pages: IMangaPage[]
  setPages: React.Dispatch<React.SetStateAction<IMangaPage[]>>
  selectedPage: IMangaPage | null
  title: string
}

const MangaPageEditor: FC<IMangaPageEditor> = ({
  isVisible,
  setIsVisible,
  pages,
  setPages,
  selectedPage,
  title
}) => {
  const [pageImg, setPageImg] = useState<File | null>(null)
  const [pageImgSrc, setPageImgSrc] = useState<string | null>(null)

  const add = () => {
    if (!pageImg) {
      console.log('Изображение не выбрано')
      return
    }

    const prevPage = pages[pages.length - 1]

    if (!!prevPage) {
      setPages([...pages, { id: prevPage.id + 1, page: prevPage.page + 1, img: pageImg }])
    } else {
      setPages([{ id: 1, page: 1, img: pageImg }])
    }

    setIsVisible(false)
    setPageImg(null)
  }

  const update = () => {
    if (!pageImg) {
      console.log('Изображение не выбрано')
      return
    }

    const updatedPages = pages.map((page) => {
      if (page.id === selectedPage?.id) {
        return { ...page, img: pageImg }
      }
      return page
    })
    setPages(updatedPages)

    setIsVisible(false)
    setPageImg(null)
  }

  useEffect(() => {
    if (selectedPage && typeof selectedPage.img === 'string') {
      setPageImgSrc(selectedPage.img)
    }

    if (selectedPage && !!selectedPage.img && typeof selectedPage.img === 'object') {
      setPageImgSrc(URL.createObjectURL(selectedPage.img))
    }

    if (!selectedPage) {
      setPageImg(null)
      setPageImgSrc(null)
    }
  }, [selectedPage, isVisible])

  useEffect(() => {
    if (pageImg) {
      setPageImgSrc(URL.createObjectURL(pageImg))
    }
  }, [pageImg])

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute inset-0 flex h-[60.625rem] w-full justify-center bg-tertiary px-8 pt-[1.94rem] transition-all'
      }
    >
      <button
        onClick={() => setIsVisible(false)}
        className='flex h-[57.3125rem] w-[16rem] items-center justify-center bg-primary text-[2.5rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Назад
      </button>

      <div className='mx-8 flex h-[57.3125rem] flex-1 flex-col items-center justify-center'>
        <div className='relative flex h-[45.4375rem] w-full flex-col items-center justify-center border-[5px] border-primary bg-secondary'>
          <div className='absolute top-0 flex h-[3.8125rem]'>
            <div className='flex h-full w-[30rem] items-center justify-center'>
              <p className='text-center text-[1.5625rem] text-[#FFF]'>
                Страница {selectedPage?.page ?? pages.length + 1}
              </p>
            </div>
            <div className='flex h-full w-[36.25rem] items-center justify-center'>
              <p className='text-center text-[1.5625rem] text-[#A3A3A3]'>{title}</p>
            </div>
          </div>

          <MangaEditorImgUpload
            title='Страница'
            img={pageImg}
            imgSrc={pageImgSrc}
            setImg={setPageImg}
            className='h-[25.8125rem]'
          />
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

export default MangaPageEditor
