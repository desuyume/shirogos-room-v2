export interface IManualTask {
  id: number
  title: string
  description: string | null
  do: number | null
  exp: number | null
}

export interface ICreateManualTasK extends Omit<IManualTask, 'id'> {}

export interface ITaskQueue {
  index: number
  taskId: number
}

export enum TaskResponseStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING'
}

export interface IManualTaskResponse {
  id: number
  img: string | null
  status: TaskResponseStatus
  username: string
}

export interface IManualTaskWithResponses {
  task: IManualTask
  responses: IManualTaskResponse[]
}

export interface IMyTaskWithResponse {
  task: IManualTask
  response?: {
    id: number
    img: string | null
    status: TaskResponseStatus
  }
}
