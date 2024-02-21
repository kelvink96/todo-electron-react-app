import { Button, DatePicker, Flex, Form, Input, Modal, ModalProps, Select } from 'antd'
import { ReactElement } from 'react'
import { ITaskBody } from '../../../../interfaces'

type FieldType = {
  title?: string
  description?: string
  dueDate?: string
  priority?: number
}

interface Props extends Partial<ModalProps> {
  handleOk: (payload: ITaskBody) => void
  handleCancel: () => void
  loading?: boolean
}

export const NewTaskItemModal = (props: Props): ReactElement | null => {
  const { handleCancel, handleOk, loading, ...others } = props

  const onFinish = (values: ITaskBody): void => {
    console.log('Success:', values)
    const dueDate = values.dueDate ? new Date(values.dueDate) : new Date()
    handleOk({ ...values, dueDate: dueDate.toISOString() })
  }

  const onFinishFailed = (errorInfo: unknown): void => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title="Create a new task"
      centered
      open={others.open}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="new-task-form"
        layout="vertical"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark="optional"
      >
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: false, message: 'Please input your description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item<FieldType>
          label="Priority"
          name="priority"
          rules={[{ required: true, message: 'Please select your priority!' }]}
        >
          <Select
            options={[
              { value: 0, label: 'Low' },
              { value: 1, label: 'Medium' },
              { value: 2, label: 'High' }
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Due Date" name="dueDate">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Flex justify="flex-end" gap="small">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}
