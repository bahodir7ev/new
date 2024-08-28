import { Button, Drawer, Flex, Form, Input, InputNumber, Select, Space, Switch, Table, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const { TextArea } = Input

function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(false)
  const [categoryloading, setCategoryLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  let isEdit = editData !== null

  let [form] = Form.useForm()

  let is_sale = Form.useWatch('is_sale', form)

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    form.resetFields()
    setEditData(null)
  }

  const handleEdit = (element) => {
    setEditData(element)
    handleOpen()
  }

  function getCategories() {
    setCategoryLoading(true)
    axios.get('https://8d9d85df956fa18e.mokky.dev/category')
      .then(res => {
        setCategories(res.data)
      }).catch(err => console.log('Nimadir xato 🔥🔥', err))
      .finally(() => setCategoryLoading(false))
  }

  function getProducts() {
    setLoading(true)
    axios.get('https://8d9d85df956fa18e.mokky.dev/products')
      .then(res => {
        setProducts(res.data)
      }).catch(err => console.log('Nimadir xato 🔥🔥', err))
      .finally(() => setLoading(false))
  }

  function handlePopular(e, id) {
    console.log(e)
    axios.patch(`https://8d9d85df956fa18e.mokky.dev/products/${id}`, { is_popular: e }).then(res => {
      if (res.data.id) {
        getProducts()
      }
    }).catch(err => console.log('Nimadir xato 🔥🔥', err))
  }

  function handleNew(e, id) {
    console.log(e)
    axios.patch(`https://8d9d85df956fa18e.mokky.dev/products/${id}`, { is_new: e }).then(res => {
      if (res.data.id) {
        getProducts()
      }
    }).catch(err => console.log('Nimadir xato 🔥🔥', err))
  }

  function handleFinish(data) {
    setPostLoading(true)
    if (isEdit) {
      axios.patch(`https://8d9d85df956fa18e.mokky.dev/products/${editData.id}`, data).then(res => {
        if (res.data.id) {
          form.resetFields()
          handleClose()
          getProducts()
        }
      }).catch(err => console.log('Nimadir xato 🔥🔥', err))
        .finally(() => setPostLoading(false))
    } else {
      axios.post('https://8d9d85df956fa18e.mokky.dev/products', data).then(res => {
        if (res.data.id) {
          form.resetFields()
          handleClose()
          getProducts()
        }
      }).catch(err => console.log('Nimadir xato 🔥🔥', err))
        .finally(() => setPostLoading(false))
    }
  }

  function handleDelete(element) {
    setLoading(true)
    axios.delete(`https://8d9d85df956fa18e.mokky.dev/products/${element.id}`).then(res => {
      getProducts()
    }).catch(err => console.log('Nimadir xato 🔥🔥', err))
      .finally(() => setLoading(false))
  }


  useEffect(() => {
    getProducts()
    getCategories()
  }, [])


  let columns = [
    {
      dataIndex: 'id',
      title: 'ID'
    },
    {
      dataIndex: 'title',
      title: 'Nomi'
    },
    {
      dataIndex: 'price',
      title: 'Narxi',
      render: (price) => (
        <Typography>{price.toLocaleString()} so'm</Typography>
      )
    },
    {
      dataIndex: 'quantity',
      title: 'Soni'
    },
    {
      title: 'Mashxurmi?',
      render: (el) => (
        <Switch defaultChecked={el.is_popular} onChange={(e) => handlePopular(e, el.id)} />
      )

    },
    {
      title: 'Yangimi?',
      render: (el) => (
        <Switch defaultChecked={el.is_new} onChange={(e) => handleNew(e, el.id)} />
      )
    },
    {
      title: 'Action',
      render: (el) => (
        <Space direction='horizontal'>
          <Button onClick={() => handleEdit(el)}>O'zgartirish</Button>
          <Button onClick={() => handleDelete(el)} danger>O'chirish</Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    if (editData !== null && editData.id) {
      form.setFieldsValue(editData)
    }
  }, [editData])

  return <Space direction='vertical' size='middle' style={{ width: '100%' }}>
    <Flex align='center' justify='space-between'>
      <Typography.Title level={3}>Products</Typography.Title>
      <Button type='primary' onClick={handleOpen}>+Add product</Button>
    </Flex>

    <Table columns={columns} dataSource={products} loading={loading} rowKey='id' />
    <Drawer
      title={isEdit ? "Mahsulot yangilash" : "Mahsulot qo'shish"}
      extra={
        <Button loading={postLoading} type='primary' onClick={() => form.submit()}>{isEdit ? "Yangilash" : "Qo'shish"}</Button>
      }
      open={open}
      onClose={handleClose}
      width='800px'
      maskClosable={false}
    >
      <Form form={form} onFinish={handleFinish} layout='vertical'>
        <Form.Item name='title' label="Mahsulot nomi" rules={[{
          required: true,
          message: 'Iltimos mahsulot nomini kiriting!'
        }]}>
          <Input placeholder='Misol uchun: Coca-Cola' />
        </Form.Item>

        <Form.Item name='description' label="Mahsulot tavsifi" rules={[{
          required: true,
          message: 'Iltimos mahsulot tavsifi kiriting!'
        }]}>
          <TextArea rows={4} placeholder='Misol uchun: Lorem ipsum dolor sit amet.' />
        </Form.Item>

        <Form.Item name="category">
          <Select options={categories.map(item => ({value: item.id, label: item.name}))} loading={categoryloading}/>
        </Form.Item>

        <Flex gap={['16px', 0]}>
          <Form.Item name='price' label="Mahsulot narxi" rules={[{
            required: true,
            message: 'Iltimos mahsulot narxini kiriting!'
          }]}
            style={{ flexGrow: 1 }}
          >
            <InputNumber type='number' controls={false} placeholder='Misol uchun: 1000000' style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name='quantity' label="Mahsulot soni" rules={[{
            required: true,
            message: 'Iltimos mahsulot sonini kiriting!'
          }]}
            style={{ flexGrow: 1 }}

          >
            <InputNumber type='number' controls={false} placeholder='Misol uchun: 12' style={{ width: '100%' }} />
          </Form.Item>
        </Flex>

        <Form.Item name='image' label="Mahsulot rasmi" rules={[{
          required: true,
          message: 'Iltimos mahsulot rasmi URL ni kiriting!'
        }]}>
          <Input type='url' />
        </Form.Item>

        <Flex justify='space-around'>
          <Form.Item name='is_new' label="Mahsulot yangimi">
            <Switch defaultValue={false} defaultChecked={false} checkedChildren="Ha" unCheckedChildren="Yo'q" />
          </Form.Item>
          <Form.Item name='is_popular' label="Mahsulot mashxurmi">
            <Switch defaultValue={false} defaultChecked={false} checkedChildren="Ha" unCheckedChildren="Yo'q" />
          </Form.Item>
          <Form.Item name='is_sale' label="Mahsulot chegirmadami">
            <Switch defaultValue={false} defaultChecked={false} checkedChildren="Ha" unCheckedChildren="Yo'q" />
          </Form.Item>
        </Flex>

        {
          is_sale ? <Form.Item name='old_price' label="Mahsulot eski narxi" rules={[{
            required: true,
            message: 'Iltimos mahsulot eski narxini kiriting!'
          }]}
            style={{ flexGrow: 1 }}
          >
            <InputNumber type='number' controls={false} placeholder='Misol uchun: 1000000' style={{ width: '100%' }} />
          </Form.Item> : null
        }
      </Form>
    </Drawer>
  </Space>
}
export default Products