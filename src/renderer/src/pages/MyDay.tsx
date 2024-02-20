import { ReactElement } from 'react'
import { Card, Flex, Typography } from 'antd'

export const MyDayPage = (): ReactElement | null => {
  return (
    <div>
      <Typography.Title>All</Typography.Title>
      <br />
      <Flex gap="middle" vertical>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx.toString()} hoverable>
            Card content
          </Card>
        ))}
      </Flex>
    </div>
  )
}
