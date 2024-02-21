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
    status: IStatus.inProgress,
    created_at: new Date().toISOString(),
    deleted: 0,
    due_date: payload.dueDate ? payload.dueDate : null
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

const updateTaskById = (payload: ITaskBody, id: string | number) => {
  const body = {
    id,
    title: payload.title,
    description: payload.description || '',
    priority: Number(payload.priority),
    status: Number(payload.status),
    created_at: new Date().toISOString(),
    deleted: 0,
    due_date: payload.dueDate ? payload.dueDate : null
  }

  const query = `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ?`
  const stmt = db.prepare(query)

  return stmt.run(body.title, body.description, body.status, body.priority, body.due_date, id)
}

const deleteTaskById = (id: string | number): unknown => {
  const query = `DELETE FROM tasks WHERE id = ?`
  const stmt = db.prepare(query)

  return stmt.run(id)
}

const tasksQuery = {
  getTasks,
  addTask,
  getTasksByStatus,
  getTaskById,
  updateTaskById,
  deleteTaskById
}

export default tasksQuery
