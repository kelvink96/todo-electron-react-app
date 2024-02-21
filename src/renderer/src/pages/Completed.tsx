import { ReactElement, useCallback, useEffect, useState } from 'react'
import { IStatus, ITaskResult } from '../../../../interfaces'
import { Divider, Flex, Spin, Typography } from 'antd'
import { TaskItemCard } from '../components'
import { InfinityIcon } from 'lucide-react'

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

  useEffect(() => {
    handleFetchTasks()
  }, [])

  return (
    <>
      {loading && <Spin />}
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} className="m-0">
          <InfinityIcon /> Completed
        </Typography.Title>
      </Flex>
      <Divider />
      <Flex gap="middle" vertical>
        {tasks.map((task, idx) => (
          <TaskItemCard key={idx.toString()} hoverable data={task}>
            {task.title}
          </TaskItemCard>
        ))}
      </Flex>
    </>
  )
}
