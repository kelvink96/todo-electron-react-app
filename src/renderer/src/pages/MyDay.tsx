import { ReactElement, useCallback, useEffect, useState } from 'react'
import { Badge, Button, Divider, Flex, Result, Typography } from 'antd'
import { SunIcon } from 'lucide-react'
import { Loader, TasksTypeWrapper } from '../components'
import { ITaskResult } from '../../../../interfaces'
import _ from 'lodash'
import { SyncOutlined } from '@ant-design/icons'
import { geekblue } from '@ant-design/colors'

export const MyDayPage = (): ReactElement | null => {
  const [tasks, setTasks] = useState<{ status: string; tasks: ITaskResult[] }[]>([])
  const [tasksCount, setTasksCount] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const handleFetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let res = await window.api.getTasks()
      setTasksCount(res.length)

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
    setLoading(true)
    setTimeout(async () => {
      await handleFetchTasks()
      setLoading(false)
    }, 3000)
  }

  useEffect(() => {
    handleFetchTasks()
  }, [])

  console.log('window api', window.api)

  return (
    <div>
      <Flex align="center" gap="small" justify="space-between">
        <Flex align="center" gap="small">
          <SunIcon />
          <Typography.Title level={3} className="m-0">
            All
          </Typography.Title>
          <Badge count={tasksCount} showZero color={geekblue['5']} />
        </Flex>
        <Button icon={<SyncOutlined />} loading={loading} onClick={refresh} />
      </Flex>
      <Divider />
      {loading && <Loader />}
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
        tasks.map((task) => (
          <TasksTypeWrapper key={task.status} groupedTasks={task} refresh={refresh} />
        ))
      )}
    </div>
  )
}
