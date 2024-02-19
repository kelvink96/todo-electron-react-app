import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, MenuProps, theme, Typography } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CalendarIcon, CheckCircleIcon, SunIcon } from 'lucide-react'

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

  useEffect(() => {
    const paths = pathname.split('/')
    setCurrent(paths[paths.length - 1])
  }, [pathname])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottom: `1px solid lightgray`
        }}
      >
        <div className="demo-logo" />
        <Typography.Title level={4} className="m-0">
          To-do App
        </Typography.Title>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={pageLinks}
            selectedKeys={[current]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
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
  )
}
