import ManualTask from '@/components/Admin/Tasks/ManualTask'
import ManualTasksList from '@/components/Admin/Tasks/ManualTasksList'
import TaskQueue from '@/components/Admin/Tasks/TaskQueue'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { ITaskQueue } from '@/types/manual-task.interface'
import { FC, useState } from 'react'

const Tasks: FC = () => {
	const [currentTaskQueue, setCurrentTaskQueue] = useState<ITaskQueue | null>(
		null
	)

	return (
		<AdminWrapper>
			<div className='px-[0.8rem] pt-[0.8rem] flex justify-between'>
				<div>
					<ManualTask />
					<ManualTasksList
						currentTaskQueue={currentTaskQueue}
						setCurrentTaskQueue={setCurrentTaskQueue}
					/>
				</div>
				{currentTaskQueue && <TaskQueue currentTaskQueue={currentTaskQueue} />}
			</div>
		</AdminWrapper>
	)
}

export default Tasks
