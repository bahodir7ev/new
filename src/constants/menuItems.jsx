import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

export const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Dashboard',
    path: '/',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Categories',
    path: '/categories',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Products',
    path: '/products',
  },
  {
    key: '4',
    icon: <UploadOutlined />,
    label: 'Orders',
    path: '/orders',
  },
  {
    key: '5',
    icon: <UploadOutlined />,
    label: 'Banners',
    path: '/banners',
  },
]
