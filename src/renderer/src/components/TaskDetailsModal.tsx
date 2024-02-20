import { Modal, ModalProps } from 'antd'
import { ReactElement } from 'react'

interface Props extends Partial<ModalProps> {
  data?: unknown
  handleOk: () => void
  handleCancel: () => void
}

export const TaskDetailsModal = (props: Props): ReactElement | null => {
  const { data, handleCancel, handleOk, ...others } = props

  console.log(data)

  return (
    <Modal title="Basic Modal" centered open={others.open} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}
