import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Flex, Layout, Menu, MenuProps, theme, Typography } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CalendarIcon, CheckCircleIcon, SunIcon } from 'lucide-react'
import { COLORS } from '../constants'
import { PlusCircleOutlined } from '@ant-design/icons'
import { ITaskBody } from '../../../../interfaces'
import { NewTaskItemModal } from '../components'

type MenuItem = Required<MenuProps>['items'][number]

const { Header, Content, Sider } = Layout

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const pageLinks: MenuProps['items'] = [
  getItem(<Link to="/">My Day</Link>, '', <SunIcon size={16} />),
  getItem(<Link to="/planned">Planned</Link>, 'planned', <CalendarIcon size={16} color="orange" />),
  getItem(
    <Link to="/completed">Completed</Link>,
    'completed',
    <CheckCircleIcon size={16} color="red" />
  )
]

export const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const { pathname } = useLocation()
  const [current, setCurrent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const handleCreateTask = async (payload: ITaskBody): Promise<void> => {
    try {
      setLoading(true)
      console.log('parsed_body', payload)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await window.api.addTask(payload)
      setLoading(false)
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    const paths = pathname.split('/')
    setCurrent(paths[paths.length - 1])
  }, [pathname])

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: COLORS['700'],
            color: COLORS['50'],
            borderBottom: `1px solid ${COLORS['400']}`
          }}
        >
          <div className="demo-logo" />
          <Flex justify="space-between" align="center" style={{ flexGrow: 1 }}>
            <Typography.Title level={4} className="m-0" style={{ color: COLORS['50'] }}>
              To-do App
            </Typography.Title>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>
              Add Task
            </Button>
          </Flex>
        </Header>
        <Layout>
          <Sider width={200} className="shadow-sm">
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemColor: 'white',
                    itemBg: COLORS['700'],
                    itemHoverBg: COLORS['600'],
                    itemHoverColor: 'white'
                  }
                }
              }}
            >
              <Menu
                mode="inline"
                style={{
                  height: '100%',
                  borderRight: 0
                }}
                items={pageLinks}
                selectedKeys={[current]}
              />
            </ConfigProvider>
          </Sider>
          <Layout style={{ padding: '24px 24px', backgroundColor: COLORS['50'] }}>
            <Content
              className="shadow-sm"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <NewTaskItemModal
        open={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleCreateTask}
        loading={loading}
      />
    </>
  )
}
