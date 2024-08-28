import { Button, Drawer, Form, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Categories() {
  const [loading, setLoading] = useState(false);
  const [deletedLoading, setDeletedLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState(null);
  const [getLoading, setGetLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  let isEdited = editData !== null;
  let text = isEdited ? "Edit category" : "Add category";

  const [form] = Form.useForm();

  function getCategories() {
    axios
      .get("https://8d9d85df956fa18e.mokky.dev/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      render: (params) => {
        return (
          <Space>
            <Button onClick={() => handleEdit(params)}>Edit</Button>
            <Button
              loading={deletedLoading}
              danger
              onClick={() => handleDelete(params)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleDelete = (params) => {
    setDeletedLoading(true);
    axios
      .delete(
        `https://8d9d85df956fa18e.mokky.dev/category/${params.id}`,
        params.id
      )
      .then((res) => {
        console.log(res);
        getCategories();
      })
      .catch((err) => console.log(err))
      .finally(() => setDeletedLoading(false));
  };

  const handleEdit = (params) => {
    setEditData(params);
    openModal();
  };

  useEffect(() => {
    form.setFieldsValue(editData);
  }, [editData]);
  const openModal = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onSubmit = (values) => {
    setLoading(true);
    const request = editData
      ? axios.patch(
          `https://8d9d85df956fa18e.mokky.dev/category/${editData.id}`,
          values
        )
      : axios.post("https://8d9d85df956fa18e.mokky.dev/category", values);

    request
      .then(() => {
        getCategories();
        onClose();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Button type="primary" onClick={openModal}>
        Add category
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey={"id"}
        loading={getLoading}
      />

      <Drawer title={text} onClose={onClose} open={open}>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your category name",
              },
            ]}
          >
            <Input placeholder="Category name" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {text}
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default Categories;
