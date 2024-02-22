import { Card, CardProps, Divider, Flex, notification, Typography } from 'antd'
import { ReactElement, useCallback, useState } from 'react'
import { IPrority, ITaskBody, ITaskResult } from '../../../../interfaces'
import { TaskDetailsModal } from './TaskDetailsModal'
import { geekblue, green, red } from '@ant-design/colors'
import { FlagIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { ClockCircleOutlined } from '@ant-design/icons'

interface Props extends Partial<CardProps> {
  task: ITaskResult
  refresh: () => void
}

export const TaskItemCard = (props: Props): ReactElement | null => {
  const { task, refresh } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITaskResult>()
  const [loading, setLoading] = useState(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCancel = (): void => {
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

  const handleDelete = async (id: string | number): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await window.api.deleteTaskById(id)
      handleCancel()
      refresh()
    } catch (e) {
      console.log(e)
      notification.error({ message: 'Task Delete', description: e?.toString() })
    }
  }

  const handleUpdateTask = async (payload: ITaskBody): Promise<void> => {
    try {
      setLoading(true)
      console.log('parsed_body', payload)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await window.api.updateTaskById(payload, task.id)
      handleCancel()
      refresh()
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      notification.error({ message: 'Task Update', description: e?.toString() })
    }
  }

  return (
    <>
      <Card
        onClick={async () => {
          await handleFetchTaskById(task.id)
          showModal()
        }}
        hoverable
      >
        <Flex justify="space-between">
          <Typography.Text strong>{task?.title}</Typography.Text>
          <FlagIcon
            color={
              task.priority === IPrority.low
                ? green['5']
                : task.priority === IPrority.medium
                  ? geekblue['5']
                  : red['5']
            }
            size={18}
          />
        </Flex>
        {task.due_date && (
          <>
            <Divider style={{ margin: '12px 0' }} />
            <Flex gap="small" align="center">
              <ClockCircleOutlined />
              <small>{dayjs(task.due_date).format('YYYY-MM-DD HH:mm').toString()}</small>
            </Flex>
          </>
        )}
      </Card>
      <TaskDetailsModal
        data={selectedTask!!}
        open={isModalOpen}
        handleOk={handleUpdateTask}
        handleCancel={handleCancel}
        loading={loading}
        handleDelete={handleDelete}
      />
    </>
  )
}
