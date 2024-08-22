import { useCreateManualTask } from '@/api/useCreateManualTask'
import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

const ManualTask: FC = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dos, setDos] = useState<string>('')
  const [exp, setExp] = useState<string>('')

  const { mutate: create } = useCreateManualTask()

  const handleClickAdd = () => {
    if (!title) {
      console.log('title is required')
      return
    }
    if (!!dos && !isNumber(dos)) {
      console.log('dos must be a number')
      return
    }
    if (!!exp && !isNumber(exp)) {
      console.log('exp must be a number')
      return
    }
    create({
      title,
      description: description ?? null,
      do: +dos ?? null,
      exp: +exp ?? null
    })
    clearFields()
  }

  const clearFields = () => {
    setTitle('')
    setDescription('')
    setDos('')
    setExp('')
  }

  return (
    <div className='h-[10.5625rem] w-[58.5vw]'>
      <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
        <h3 className='text-[1.5625rem] text-[#FFF]'>Ручное задание</h3>
      </div>
      <div className='flex h-[7.20rem]'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='h-full w-[30%] bg-secondary px-2 text-center text-xl text-[#B7B7B7] outline-none placeholder:text-[#B7B7B7]'
          placeholder='Название'
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='h-full w-[25%] bg-secondary px-2 text-center text-xl text-[#B7B7B7] outline-none placeholder:text-[#B7B7B7]'
          placeholder='Описание'
        />
        <input
          value={dos}
          onChange={(e) => setDos(e.target.value)}
          className='h-full w-[12.5%] bg-secondary px-2 text-center text-xl text-[#B7B7B7] outline-none placeholder:text-[#B7B7B7]'
          placeholder='ДО'
        />
        <input
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          className='h-full w-[12.5%] bg-secondary px-2 text-center text-xl text-[#B7B7B7] outline-none placeholder:text-[#B7B7B7]'
          placeholder='Опыт'
        />
        <button
          onClick={handleClickAdd}
          className='w-[20%] bg-primary text-[1.375rem] text-[#FFF] transition-all hover:bg-primaryHover'
        >
          Добавить
        </button>
      </div>
    </div>
  )
}

export default ManualTask
