import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import tasksQuery from '../../models/taskManager'
import { IStatus, ITaskBody, ITaskResult } from '../../interfaces'

const getTasks = (): ITaskResult[] => {
  return tasksQuery.getTasks()
}

const addTask = (body: ITaskBody): void => {
  console.log('window.api', body)
  tasksQuery.addTask(body)
}

const getTasksByStatus = (status: IStatus): ITaskResult[] => {
  return tasksQuery.getTasksByStatus(status)
}

const getTaskById = (id: string | number): ITaskResult => {
  return tasksQuery.getTaskById(id)
}

const updateTaskById = (body: ITaskBody, id: string | number): void => {
  tasksQuery.updateTaskById(body, id)
}

const deleteTaskById = (id: string | number): void => {
  tasksQuery.deleteTaskById(id)
}

// Custom APIs for renderer
const api = {
  getTasks,
  addTask,
  getTasksByStatus,
  getTaskById,
  updateTaskById,
  deleteTaskById
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
