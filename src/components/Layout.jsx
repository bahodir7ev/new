import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Menu } from 'antd'
import { menuItems } from '../constants/menuItems'
import Profile from './Profile'
import { Link, Route, Routes } from 'react-router-dom'
import { routes } from '../constants/routes'
const { Header, Sider, Content } = Layout
function Main() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={menuItems.map((item) => ({
            ...item,
            label: <Link to={item.path}>{item.label}</Link>,
          }))}
        />
      </Sider>
      <Layout>
        <Header className='header'>
          <Flex justify='space-between'>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className='header-menu-button'
            />
            <Profile />
          </Flex>
        </Header>
        <Content className='main-content'>
          <Routes>
            {routes.map(({ path, id, component }) => (
              <Route path={path} key={id} element={component} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
