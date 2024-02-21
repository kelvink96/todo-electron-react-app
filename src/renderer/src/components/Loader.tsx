import React, { ReactElement } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { blue } from '@ant-design/colors'

export const Loader: React.FC = (): ReactElement | null => (
  <div
    style={{
      margin: '20px 0',
      marginBottom: '20px',
      padding: '16px 50px',
      textAlign: 'center',
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '4px',
      color: blue['5'],
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    <p className="m-0">loading...</p>
  </div>
)
