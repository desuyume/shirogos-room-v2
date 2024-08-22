import { FC, useEffect, useRef, useState } from 'react'
import FindUser from '../../FindUser'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { useCreateNotification } from '@/api/useCreateNotification'
import { toast } from 'react-toastify'
import { IFindUser } from '@/types/user.interface'

const Notification: FC = () => {
  const [text, setText] = useState<string>('')
  const [selectedUsers, setSelectedUsers] = useState<IFindUser[]>([])
  const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
  const [img, setImg] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const { mutate: createNotification, isSuccess } = useCreateNotification()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0])
    }
  }

  const clickSend = () => {
    const data = new FormData()
    if (!text) {
      toast.warning('Текст оповещения обязателен !')
      return
    }
    data.append('text', text)
    if (img) {
      data.append('img', img)
    }
    const usersId = selectedUsers.map((user) => user.id)
    data.append('usersId', JSON.stringify(usersId))
    createNotification(data)
  }

  const clearFields = () => {
    setText('')
    setSelectedUsers([])
    setIsImgUploaded(false)
    setImg(null)
  }

  useEffect(() => {
    previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      clearFields()
    }
  }, [isSuccess])

  return (
    <div className='flex h-full w-[37.58%] flex-col'>
      <div className='relative mb-[0.12rem] flex w-full justify-between'>
        <div className='flex h-[9.6875rem] w-[65.35%] flex-col'>
          <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
            <p className='text-center text-xl leading-none text-[#FFF]'>Окно отправки оповещения</p>
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
                  ' absolute inset-0 h-full w-full rounded-[0.4375rem] object-cover'
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
        </div>
        <FindUser
          isVisible={true}
          selectType='users'
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          multiple
          className='w-[34.27%]'
        />
      </div>
      <button
        onClick={clickSend}
        className='h-[2.0625rem] w-full bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Отправить
      </button>
    </div>
  )
}

export default Notification
