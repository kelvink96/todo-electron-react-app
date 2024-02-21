import db from './dbManager'
import { IStatus, ITaskBody, ITaskResult } from '../interfaces'

const getTasks = (): ITaskResult[] => {
  const query = 'SELECT * FROM tasks;'
  const stmt = db.prepare(query)

  return stmt.all()
}

const addTask = (payload: ITaskBody): unknown => {
  const body = {
    title: payload.title,
    description: payload.description || '',
    priority: Number(payload.priority),
    status: IStatus.pending,
    created_at: new Date().toISOString(),
    deleted: 0,
    due_date: payload.dueDate || ''
  }

  const query = `INSERT INTO tasks (title, description, priority, status, created_at, deleted, due_date)
      VALUES (:title, :description, :priority, :status, :created_at, :deleted, :due_date)`
  const stmt = db.prepare(query)

  return stmt.run({ ...body })
}

const getTasksByStatus = (status: IStatus): ITaskResult[] => {
  const query = `SELECT * FROM tasks WHERE status = ${status}`
  const stmt = db.prepare(query)

  return stmt.all()
}

const getTaskById = (id: string | number): ITaskResult => {
  const query = `SELECT * FROM tasks WHERE id = ?`
  const stmt = db.prepare(query)

  return stmt.get(id)
}

const tasksQuery = { getTasks, addTask, getTasksByStatus, getTaskById }

export default tasksQuery
