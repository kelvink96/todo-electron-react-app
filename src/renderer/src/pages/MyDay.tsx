import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Button, Card, Divider, Flex, Spin, Typography } from 'antd'
import { InfinityIcon } from 'lucide-react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { NewTaskItemModal } from '../components'
import { ITaskBody, ITaskResult } from '../../../../interfaces'

export const MyDayPage = (): ReactElement | null => {
  const [tasks, setTasks] = useState<ITaskResult[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const handleFetchTasks = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await window.api.getTasks
    setTasks(res)
  }, [])

  const handleCreateTask = async (payload: ITaskBody): Promise<void> => {
    try {
      setLoading(true)
      console.log('parsed_body', payload)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await window.api.addTask(payload)
      await refresh()
      setLoading(false)
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const refresh = async (): Promise<void> => {
    await handleFetchTasks()
  }

  useEffect(() => {
    handleFetchTasks()
  }, [])

  console.log('window api', window.api)
  console.log('tasks', tasks)

  return (
    <div>
      {loading && <Spin />}
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} className="m-0">
          <InfinityIcon /> All
        </Typography.Title>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>
          Add Task
        </Button>
      </Flex>
      <Divider />
      <Flex gap="middle" vertical>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx.toString()} hoverable>
            Card content
          </Card>
        ))}
      </Flex>
      <NewTaskItemModal
        open={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleCreateTask}
        loading={loading}
      />
    </div>
  )
}
