import { FC } from 'react'

interface IRemoveConfirmModal {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  elementText?: string
  removeFn?: () => void
}

const RemoveConfirmModal: FC<IRemoveConfirmModal> = ({
  isVisible,
  setIsVisible,
  elementText,
  removeFn
}) => {
  const handleRemove = () => {
    removeFn && removeFn()
    setIsVisible(false)
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        `fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-all`
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='items-center rounded-[37px] bg-secondary p-10 text-center'
      >
        <p className='mb-8 text-center text-[1.5625rem] text-[#FFF]'>
          Вы уверены, что хотите удалить этот элемент?
        </p>
        {elementText && (
          <p className='mb-8 text-center text-[1.5625rem] text-[#FFF]'>{elementText}</p>
        )}
        <div className='flex justify-center'>
          <button
            onClick={() => setIsVisible(false)}
            className='mr-4 h-[3.125rem] w-[10rem] bg-tertiary text-[1.5625rem] text-[#FFF] transition-all hover:bg-opacity-80'
          >
            Отмена
          </button>
          <button
            onClick={handleRemove}
            className='h-[3.125rem] w-[10rem] bg-primary text-[1.5625rem] text-[#FFF] transition-all hover:bg-primaryHover'
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default RemoveConfirmModal
