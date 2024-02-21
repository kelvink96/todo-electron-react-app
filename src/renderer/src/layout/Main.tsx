import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps, theme, Typography } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CalendarIcon, CheckCircleIcon, SunIcon } from 'lucide-react'
import { COLORS } from '../constants'

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
          backgroundColor: COLORS['700'],
          color: COLORS['50']
        }}
      >
        <div className="demo-logo" />
        <Typography.Title level={4} className="m-0" style={{ color: COLORS['50'] }}>
          To-do App
        </Typography.Title>
      </Header>
      <Layout>
        <Sider width={200} className="shadow-sm">
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0, backgroundColor: COLORS['100'] }}
            items={pageLinks}
            selectedKeys={[current]}
          />
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
  )
}
