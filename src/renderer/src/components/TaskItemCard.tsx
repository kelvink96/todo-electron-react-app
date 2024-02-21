import { Card, CardProps } from 'antd'
import { ReactElement } from 'react'
import { ITaskResult } from '../../../../interfaces'

interface Props extends Partial<CardProps> {
  data?: ITaskResult
}

export const TaskItemCard = (props: Props): ReactElement | null => {
  const { data } = props

  console.log(data)

  return (
    <Card>
      {data?.title}
      {data?.description}
    </Card>
  )
}
