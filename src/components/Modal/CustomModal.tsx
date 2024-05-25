import { Modal } from 'antd'
import React from 'react'

type Props = {
  title: string
  onClose?: () => void
  visible: boolean
  footer?: React.ReactNode
  children: React.ReactNode
}

const CustomModal: React.FC<Props> = (props) => {
  return (
    <Modal
      width={'80vw'}
      styles={{ body: { height: '70vh', overflowY: 'auto' } }}
      title={<h1 className="m-4 text-3xl font-bold text-primary-blue-700 opacity-75">{props.title}</h1>}
      open={props.visible}
      centered
      closeIcon={null}
      footer={props.footer}
      onCancel={props.onClose}
      style={{ width: '100%', resize: 'none' }}
    >
      {props.children}
    </Modal>
  )
}

export default CustomModal
