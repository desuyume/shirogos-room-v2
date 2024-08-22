import { useCreateNews } from '@/api/useCreateNews'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

const News: FC = () => {
  const [text, setText] = useState<string>('')
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const [img, setImg] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const { mutate, isSuccess } = useCreateNews()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  const clickAdd = () => {
    if (img) {
      const contentData = new FormData()
      contentData.append('text', text)
      contentData.append('img', img)
      mutate(contentData)
    } else {
      console.log('img is required')
    }
  }

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setImg(null)
      setText('')
      setIsImgUploaded(false)
    }
  }, [isSuccess])

  return (
    <div className='flex h-full w-[24.56%] flex-col'>
      <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
        <p className='text-center text-xl leading-none text-[#FFF]'>Окно отправки новости</p>
      </div>
      <div className='flex w-full flex-1 items-center bg-secondary px-[1.06rem]'>
        <div className='relative mr-[0.81rem] h-[5.5rem] min-w-[4.0625rem] max-w-[4.0625rem] rounded-[0.4375rem] border-[1px] border-[#FFF]'>
          <input
            ref={inputRef}
            className='absolute inset-0 z-10 h-full w-full rounded-[0.4375rem] bg-transparent opacity-0'
            accept='image/*'
            type='file'
            onChange={(e) => handleFileChange(e)}
          />
          <img
            ref={imgRef}
            className={
              (isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') +
              ' absolute inset-0 h-full w-full rounded-[0.4375rem]'
            }
            src='#'
            alt='panopticon-img'
          />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='h-[5.5rem] flex-1 resize-none bg-transparent py-[0.31rem] font-secondary text-[0.9375rem] font-semibold text-[#FFF] outline-none'
        />
      </div>
      <button
        onClick={clickAdd}
        className='h-[2.0625rem] w-full bg-primary text-center text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Отправить
      </button>
    </div>
  )
}

export default News
