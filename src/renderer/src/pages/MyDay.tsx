import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Divider, Flex, Spin, Typography } from 'antd'
import { SunIcon } from 'lucide-react'
import { TasksTypeWrapper } from '../components'
import { ITaskResult } from '../../../../interfaces'
import _ from 'lodash'

export const MyDayPage = (): ReactElement | null => {
  const [tasks, setTasks] = useState<{ status: string; tasks: ITaskResult[] }[]>([])
  const [loading, setLoading] = useState(false)

  const handleFetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let res = await window.api.getTasks()

      // group tasks by status
      res = _.chain(res)
        .groupBy('status')
        .map((items, status) => {
          return { status, tasks: items }
        })
        // @ts-ignore
        .values()
        .value()

      setTasks(res)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }, [])

  const refresh = async (): Promise<void> => {
    await handleFetchTasks()
  }

  useEffect(() => {
    handleFetchTasks()
  }, [])

  console.log('window api', window.api)

  return (
    <div>
      {loading && <Spin />}
      <Flex align="center" gap="small">
        <SunIcon />
        <Typography.Title level={3} className="m-0">
          All
        </Typography.Title>
      </Flex>
      <Divider />
      {tasks.map((task) => (
        <TasksTypeWrapper key={task.status} groupedTasks={task} />
      ))}
    </div>
  )
}
