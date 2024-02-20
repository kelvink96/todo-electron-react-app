import { Card, CardProps } from 'antd'
import { ReactElement } from 'react'

interface Props extends Partial<CardProps> {
  data?: any
}

export const TaskItemCard = (props: Props): ReactElement | null => {
  const { data } = props

  console.log(data)

  return <Card></Card>
}
