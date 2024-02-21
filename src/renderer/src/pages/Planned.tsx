import { ReactElement, useCallback, useEffect, useState } from 'react'
import { IStatus, ITaskResult } from '../../../../interfaces'
import { TaskItemCard } from '../components'
import { Badge, Button, Divider, Flex, Result, Spin, Typography } from 'antd'
import { CalendarIcon } from 'lucide-react'
import { orange } from '@ant-design/colors'

export const PlannedPage = (): ReactElement | null => {
  const [tasks, setTasks] = useState<ITaskResult[]>([])
  const [loading, setLoading] = useState(false)

  console.log('window-apis', window.api)

  const handleFetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await window.api.getTasksByStatus(IStatus.inProgress)
      setTasks(res)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [window])

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
      <Flex gap="small" align="center">
        <CalendarIcon />
        <Typography.Title level={3} className="m-0">
          Planned
        </Typography.Title>
        <Badge count={tasks.length} showZero color={orange['5']} />
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
