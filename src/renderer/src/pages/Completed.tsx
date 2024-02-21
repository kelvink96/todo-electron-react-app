import { ReactElement, useCallback, useEffect, useState } from 'react'
import { IStatus, ITaskResult } from '../../../../interfaces'
import { Badge, Button, Divider, Flex, Result, Spin, Typography } from 'antd'
import { TaskItemCard } from '../components'
import { CheckCircleIcon } from 'lucide-react'
import { green } from '@ant-design/colors'

export const CompletedPage = (): ReactElement | null => {
  const [tasks, setTasks] = useState<ITaskResult[]>([])
  const [loading, setLoading] = useState(false)

  console.log('window-apis', window.api)

  const handleFetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await window.api.getTasksByStatus(IStatus.completed)
      setTasks(res)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [])

  const refresh = async (): Promise<void> => {
    setLoading(true)
    setTimeout(async () => {
      await handleFetchTasks()
      setLoading(false)
    }, 3000)
  }

  useEffect(() => {
    handleFetchTasks()
  }, [])

  return (
    <>
      {loading && <Spin />}
      <Flex align="center" gap="small">
        <CheckCircleIcon />
        <Typography.Title level={3} className="m-0">
          Completed
        </Typography.Title>
        <Badge count={tasks.length} showZero color={green['6']} />
      </Flex>
      <Divider />
      <Flex gap="middle" vertical>
        {tasks.length === 0 ? (
          <Result
            status="404"
            title="No tasks found"
            subTitle="Sorry, no tasks found try refreshing."
            extra={
              <Button type="primary" onClick={refresh} loading={loading}>
                Refresh
              </Button>
            }
          />
        ) : (
          tasks.map((task, idx) => (
            <TaskItemCard key={idx.toString()} hoverable task={task} refresh={refresh}>
              {task.title}
            </TaskItemCard>
          ))
        )}
      </Flex>
    </>
  )
}
