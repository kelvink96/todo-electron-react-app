import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select,
  Spin,
  Typography
} from 'antd'
import { ReactElement, useEffect } from 'react'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { ITaskResult } from '../../../../interfaces'

type FieldType = {
  title?: string
  description?: string
  status?: string
  priority?: string
  dueDate?: string
}

interface Props extends Partial<ModalProps> {
  data?: ITaskResult
  handleOk: () => void
  handleCancel: () => void
  loading: boolean
}

export const TaskDetailsModal = (props: Props): ReactElement | null => {
  const { data, handleCancel, handleOk, loading, ...others } = props
  const [form] = Form.useForm()

  console.log(data)

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ title: data.title, description: data.description })
    }
  }, [data])

  return (
    <Modal
      title={data?.title}
      centered
      open={others.open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={720}
    >
      {loading && <Spin />}
      <Row justify="center" align="top" gutter={[16, 16]}>
        <Col sm={24} md={16} lg={18}>
          <Form
            form={form}
            name="edit-task-form"
            layout="vertical"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
              rules={[{ required: false, message: 'Please input your password!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Row gutter={16}>
              <Col md={24} lg={12}>
                <Form.Item<FieldType>
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Please select your status!' }]}
                >
                  <Select
                    style={{ flexGrow: 1 }}
                    options={[
                      { value: 0, label: 'Pending' },
                      { value: 1, label: 'In Progress' },
                      { value: 2, label: 'Complete' }
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col md={24} lg={12}>
                <Form.Item<FieldType>
                  label="Priority"
                  name="priority"
                  rules={[{ required: true, message: 'Please select your priority!' }]}
                >
                  <Select
                    options={[
                      { value: 0, label: 'Low' },
                      { value: 1, label: 'Medium' },
                      { value: 2, label: 'Hight' }
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item<FieldType>
              label="Due date"
              name="dueDate"
              rules={[{ required: false, message: 'Please select your priority!' }]}
            >
              <DatePicker style={{ width: '100%' }} minDate={dayjs()} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Flex justify="flex-start" gap="small">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Flex>
            </Form.Item>
          </Form>
        </Col>
        <Col sm={24} md={8} lg={6}>
          <Typography.Text strong>Actions</Typography.Text>
          <Divider style={{ margin: '12px 0' }} />
          <Flex vertical gap="small">
            <Button icon={<CheckCircleOutlined />}>Complete</Button>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </Flex>
        </Col>
      </Row>
    </Modal>
  )
}
