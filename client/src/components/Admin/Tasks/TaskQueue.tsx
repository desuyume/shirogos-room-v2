import { FC, useState } from 'react'
import TaskQueueItem from './TaskQueueItem'
import { ITaskQueue } from '@/types/manual-task.interface'
import { useTaskResponses } from '@/api/useTaskResponses'
import { Scrollbar } from 'react-scrollbars-custom'
import ZoomedImageModal from '@/components/ZoomedImageModal'

interface TaskQueueProps {
  currentTaskQueue: ITaskQueue
}

const TaskQueue: FC<TaskQueueProps> = ({ currentTaskQueue }) => {
  const [zoomedImg, setZoomedImg] = useState<string | null>(null)

  const { data: taskResponses, isLoading, isError } = useTaskResponses(currentTaskQueue.taskId)

  return (
    <div
      className={
        (!!currentTaskQueue ? 'visible opacity-100' : 'invisible opacity-0') +
        ' manual-task-queue mr-7 h-[51.5625rem] w-[37vw] bg-secondary transition-all'
      }
    >
      <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
        {!!currentTaskQueue && (
          <h3 className='text-[1.375rem] text-[#FFF]'>Очередь #{currentTaskQueue.index}</h3>
        )}
      </div>

      {isLoading ? (
        <div className='flex h-[48.1875rem] w-full items-center justify-center'>
          <p className='text-[1.375rem] text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[48.1875rem] w-full items-center justify-center'>
          <p className='text-[1.375rem] text-primaryText'>Ошибка</p>
        </div>
      ) : !taskResponses.responses.length ? (
        <div className='flex h-[48.1875rem] w-full items-center justify-center'>
          <p className='text-[1.375rem] text-primaryText'>Нет ответов</p>
        </div>
      ) : (
        <Scrollbar noDefaultStyles style={{ width: '100%', height: '48.1875rem' }}>
          <>
            {taskResponses.responses.map((response) => (
              <TaskQueueItem key={response.id} response={response} setZoomedImg={setZoomedImg} />
            ))}
          </>
        </Scrollbar>
      )}

      <ZoomedImageModal
        img={zoomedImg}
        isVisible={!!zoomedImg}
        onClose={() => setZoomedImg(null)}
      />
    </div>
  )
}

export default TaskQueue
