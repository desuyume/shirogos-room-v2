import { FC } from 'react'
import ManualTaskItem from './ManualTaskItem'
import { useManualTasks } from '@/api/useManualTasks'
import { ITaskQueue } from '@/types/manual-task.interface'
import { Scrollbar } from 'react-scrollbars-custom'

interface IManualTasksList {
  currentTaskQueue: ITaskQueue | null
  setCurrentTaskQueue: React.Dispatch<React.SetStateAction<ITaskQueue | null>>
}

const ManualTasksList: FC<IManualTasksList> = ({ currentTaskQueue, setCurrentTaskQueue }) => {
  const { data: tasks, isLoading, isError } = useManualTasks()

  return (
    <div className='manual-tasks-admin mt-[0.8rem] w-[58.5vw]'>
      <div className='flex h-[3.375rem] w-[75%] items-center justify-center bg-tertiary'>
        <h3 className='text-[1.5625rem] text-[#FFF]'>Список ручных заданий</h3>
      </div>
      {isLoading ? (
        <div className='flex w-[75%] items-center justify-center pt-2'>
          <p className='text-center text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex w-[75%] items-center justify-center pt-2'>
          <p className='text-center text-primaryText'>Ошибка</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className='flex w-[75%] items-center justify-center pt-2'>
          <p className='text-center text-primaryText'>Нет заданий</p>
        </div>
      ) : (
        <Scrollbar noDefaultStyles style={{ width: '100%', height: '520px' }}>
          {tasks.map((task, index) => (
            <ManualTaskItem
              key={task.id}
              index={index + 1}
              task={task}
              currentTaskQueue={currentTaskQueue}
              setCurrentTaskQueue={setCurrentTaskQueue}
            />
          ))}
        </Scrollbar>
      )}
    </div>
  )
}

export default ManualTasksList
