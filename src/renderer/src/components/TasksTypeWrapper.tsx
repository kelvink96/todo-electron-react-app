import { Collapse, List, theme } from 'antd'
import { IStatus, ITaskResult } from '../../../../interfaces'
import { TaskItemCard } from './TaskItemCard'
import { geekblue, green } from '@ant-design/colors'

interface Props {
  groupedTasks: {
    status: string
    tasks: ITaskResult[]
  }
  refresh: () => void
}

export const TasksTypeWrapper = ({ groupedTasks, refresh, ...others }: Props) => {
  const { token } = theme.useToken()
  console.log(groupedTasks)

  const panelStyle: React.CSSProperties = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none'
  }

  return (
    <Collapse
      ghost
      style={{
        background: IStatus.inProgress === Number(groupedTasks.status) ? geekblue['1'] : green['1']
      }}
      items={[
        {
          key: groupedTasks.status,
          label: IStatus[groupedTasks.status],
          children: (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={groupedTasks.tasks}
              renderItem={(item) => (
                <List.Item>
                  <TaskItemCard task={item} refresh={refresh} />
                </List.Item>
              )}
            />
          ),
          style: panelStyle
        }
      ]}
      {...others}
    />
  )
}
