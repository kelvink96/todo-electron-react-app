export interface ITaskResult {
  id: number
  title: string
  description: string
  due_date: string
  priority: number
  status: number
  created_at: string
  completed_at: string
  deleted_at: string
  deleted: number
}

export interface ITaskBody {
  title: string
  description?: string
  priority: number | string
  dueDate?: string
}
