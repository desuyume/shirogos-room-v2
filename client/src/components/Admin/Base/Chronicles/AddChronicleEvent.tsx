import { useCreateChronicleEvent } from '@/api/useCreateChronicleEvent'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IAddChronicleEvent {
  chronicleId: number | null
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddChronicleEvent: FC<IAddChronicleEvent> = ({ chronicleId, visible, setVisible }) => {
  const [day, setDay] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const [img, setImg] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const { mutate, isSuccess } = useCreateChronicleEvent(chronicleId ?? 0)

  const clickAdd = () => {
    if (!day) {
      console.log('day is required')
      return
    }

    if (!text && !img) {
      console.log('text or img is required')
      return
    }

    const eventData = new FormData()

    if (day.includes('-')) {
      eventData.append('prefix', '-')
    }

    const dayData = day.replace('-', '')
    if (Number.parseInt(dayData)) {
      eventData.append('day', dayData)
    } else {
      console.log('invalid day')
    }

    if (text) {
      eventData.append('text', text)
    }
    if (img) {
      eventData.append('img', img)
    }

    mutate(eventData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setVisible(false)
      setDay('')
      setImg(null)
      setText('')
      setIsImgUploaded(false)
    }
  }, [isSuccess])

  return (
    <div
      className={
        'fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-secondary bg-opacity-70 transition-all ' +
        (visible ? 'visible opacity-100' : 'invisible opacity-0')
      }
      onClick={() => setVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center rounded-[37px] bg-secondary bg-opacity-90 px-[3.6rem] pb-12 pt-16 text-center'
      >
        <div className='mb-10 flex h-[2.875rem] w-[30rem]'>
          <div className='flex h-full w-[10%] items-center justify-center'>
            <input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className='h-full w-full border-[1px] border-primary bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none placeholder:text-primaryText'
            />
          </div>
          <div className='mx-8 flex h-full flex-1 items-center justify-center'>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='h-full w-full border-[1px] border-primary bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none placeholder:text-primaryText'
            />
          </div>
          <div className='relative h-full w-[2.875rem] border-[1px] border-[#FFF] bg-primaryText bg-opacity-10'>
            <input
              ref={inputRef}
              className='absolute inset-0 z-10 h-full w-full bg-transparent opacity-0'
              accept='image/*'
              type='file'
              onChange={(e) => handleFileChange(e)}
            />
            <img
              ref={imgRef}
              className={
                (isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') +
                ' absolute inset-0 h-full w-full'
              }
              src='#'
              alt='panopticon-img'
            />
          </div>
        </div>
        <div className='flex h-[2.5rem] w-full items-center justify-center'>
          <button
            onClick={() => setVisible(false)}
            className='mr-4 h-full w-[12rem] bg-tertiary text-xl text-[#FFf] transition-all hover:bg-opacity-80'
          >
            Отмена
          </button>
          <button
            onClick={clickAdd}
            className='h-full w-[12rem] bg-primary text-xl text-[#FFF] transition-all hover:bg-primaryHover'
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddChronicleEvent
