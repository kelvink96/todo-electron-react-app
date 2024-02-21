import { Card, CardProps } from 'antd'
import { ReactElement, useCallback, useState } from 'react'
import { ITaskResult } from '../../../../interfaces'
import { TaskDetailsModal } from './TaskDetailsModal'
import _ from 'lodash'

interface Props extends Partial<CardProps> {
  task: ITaskResult
}

export const TaskItemCard = (props: Props): ReactElement | null => {
  const { task } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITaskResult>()
  const [loading, setLoading] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleFetchTaskById = useCallback(async (id: string | number) => {
    try {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await window.api.getTaskById(id)

      console.log(res)
      setSelectedTask(res)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }, [])

  return (
    <>
      <Card
        className="shadow-sm"
        onClick={async () => {
          await handleFetchTaskById(task.id)
          showModal()
        }}
        hoverable
      >
        {task?.title}
        {task?.description}
      </Card>
      <TaskDetailsModal
        data={selectedTask}
        open={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loading}
      />
    </>
  )
}
