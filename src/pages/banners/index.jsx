import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Table,
  Image,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Banners() {
  const [banners, setBanners] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [form] = Form.useForm();

  const getBanners = async () => {
    setLoadingBanner(true);
    try {
      const res = await axios.get("https://8d9d85df956fa18e.mokky.dev/banner");
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBanner(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingButton(true);
    try {
      await axios.delete(`https://8d9d85df956fa18e.mokky.dev/banner/${id}`);
      getBanners();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingButton(false);
    }
  };

  const handleEdit = (banner) => {
    setEditMode(true);
    setCurrentBanner(banner);
    form.setFieldsValue({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
    });
    setOpen(true);
  };

  const onSubmit = async (values) => {
    setLoadingButton(true);
    try {
      if (editMode) {
        await axios.patch(
          `https://8d9d85df956fa18e.mokky.dev/banner/${currentBanner.id}`,
          values
        );
      } else {
        await axios.post("https://8d9d85df956fa18e.mokky.dev/banner", values);
      }
      getBanners();
      form.resetFields();
      setOpen(false);
      setEditMode(false);
      setCurrentBanner(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "SUBTITLE",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image
          width={200}
          src={
            text ||
            "https://firebasestorage.googleapis.com/v0/b/convex-4442c.appspot.com/o/banner-bg.png?alt=media&token=ea526fea-5a82-420a-ba1a-f6cd3d7b54e5"
          }
        />
      ),
    },
    {
      title: "ACTION",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            loading={loadingButton}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            loading={loadingButton}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add new
      </Button>
      <Table
        dataSource={banners}
        columns={columns}
        loading={loadingBanner}
        rowKey="id"
      />
      <Drawer
        title={editMode ? "Edit Banner" : "Add New Banner"}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Form form={form} onFinish={onSubmit}>
          <Space direction="vertical" size="small">
            <Form.Item
              label="Banner Title"
              name="title"
              rules={[{ required: true, message: "Please fill!" }]}
            >
              <Input placeholder="Banner Title" />
            </Form.Item>
            <Form.Item
              label="Banner Subtitle"
              name="subtitle"
              rules={[{ required: true, message: "Please fill!" }]}
            >
              <Input placeholder="Banner Subtitle" />
            </Form.Item>
            <Form.Item
              label="Banner Image URL"
              name="image"
              rules={[{ required: true, message: "Please fill!" }]}
            >
              <Input placeholder="Banner Image URL" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loadingButton}>
              {editMode ? "Update" : "Submit"}
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
}

export default Banners;
