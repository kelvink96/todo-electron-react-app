import { Collapse, List, theme } from 'antd'
import { ITaskResult } from '../../../../interfaces'
import { TaskItemCard } from './TaskItemCard'
import { COLORS } from '../constants'

interface Props {
  groupedTasks: {
    status: string
    tasks: ITaskResult[]
  }
}

export const TasksTypeWrapper = ({ groupedTasks, ...others }: Props) => {
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
      defaultActiveKey={['1']}
      ghost
      style={{ background: COLORS['50'] }}
      items={[
        {
          key: groupedTasks.status,
          label: groupedTasks.status,
          children: (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={groupedTasks.tasks}
              renderItem={(item) => (
                <List.Item>
                  <TaskItemCard data={item} />
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
