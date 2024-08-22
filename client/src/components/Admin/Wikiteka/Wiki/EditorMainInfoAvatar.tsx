import CropModal from '@/components/CropModal'
import { clearCanvas } from '@/utils/cropUtils'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IEditorMainInfoAvatar {
  avatar: File | null
  setAvatar: React.Dispatch<React.SetStateAction<File | null>>
  setMiniature: React.Dispatch<React.SetStateAction<File | null>>
}

const EditorMainInfoAvatar: FC<IEditorMainInfoAvatar> = ({ avatar, setAvatar, setMiniature }) => {
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const miniatureRef = useRef<HTMLCanvasElement | null>(null)

  const [isMiniatureModalVisible, setIsMiniatureModalVisible] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0])
    }
  }

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

  useEffect(() => {
    if (!avatar) {
      setIsImgUploaded(false)
      imgRef.current?.setAttribute('src', '')
      if (miniatureRef.current) {
        clearCanvas(miniatureRef.current)
      }
    }
  }, [avatar])

  return (
    <div className='mt-[1.8rem] flex'>
      <div className='mr-[3.5rem] flex h-[25.8125rem] w-[39.75rem] border-[5px] border-primary'>
        <div className='flex h-full w-[16.375rem] items-center justify-center bg-tertiary'>
          <p className='text-center text-[1.5625rem] text-[#FFF]'>Аватарка</p>
        </div>
        <div className='relative flex h-full flex-1 items-center justify-center bg-primaryText bg-opacity-20 transition-all hover:bg-opacity-30'>
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            onChange={(e) => handleFileChange(e)}
          />
          <p className='text-center text-[3.125rem] text-[#FFF] text-opacity-25'>
            Загрузить аватарку
          </p>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <div className='mb-[0.37rem] flex flex-col items-center'>
          <p className='mb-[0.5rem] text-center text-[1.5625rem] leading-none text-[#FFF]'>
            Выбранная аватарка
          </p>
          <div className='h-[11rem] w-[8.1875rem] rounded-[1.25rem] bg-tertiary'>
            <img
              ref={imgRef}
              src='#'
              alt='avatar'
              className={
                (isImgUploaded ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
                'h-full w-full rounded-[1.25rem]'
              }
            />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <p className='mb-[0.5rem] text-center text-[1.5625rem] leading-none text-[#FFF]'>
            Выбранная миниатюра
          </p>
          <button
            disabled={!isImgUploaded}
            onClick={() => isImgUploaded && setIsMiniatureModalVisible(true)}
            className='h-[11rem] w-[8.1875rem] rounded-[1.25rem] bg-tertiary transition-all hover:bg-opacity-90 disabled:hover:bg-tertiary'
          >
            <canvas
              className={
                (isImgUploaded ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
                'h-full w-full rounded-[1.25rem]'
              }
              ref={miniatureRef}
            ></canvas>
          </button>
        </div>
      </div>

      <CropModal
        aspect={179 / 240}
        img={imgRef.current?.src ?? ''}
        isVisible={isMiniatureModalVisible}
        setIsVisible={setIsMiniatureModalVisible}
        canvas={miniatureRef.current}
        setMiniature={setMiniature}
      />
    </div>
  )
}

export default EditorMainInfoAvatar
