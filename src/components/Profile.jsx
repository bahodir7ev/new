import { Avatar, Button, Dropdown, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { logout } = useContext(AuthContext);
  const items = [
    {
      key: "1",
      label: <Button onClick={logout}>Log out</Button>,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow
    >
      <Flex align="center" gap={12}>
        <Avatar size="default" icon={<UserOutlined />} />
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          Bahramov Bahodir
        </Typography.Paragraph>
      </Flex>
    </Dropdown>
  );
}

export default Profile;
