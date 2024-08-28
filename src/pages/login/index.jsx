import React, { useContext, useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  function login(data) {
    axios
      .post("https://8d9d85df956fa18e.mokky.dev/auth", data)
      .then(function (res) {
        if (res.data.token) {
          setUser(res.data.token);
          navigate("/");
        }
      })
      .catch(function (err) {
        if (err.response.data.error === "Unauthorized") {
          message.error("Login yoki parol xato!");
        }
      });
  }

  function handleSubmit(data) {
    login(data);
  }

  return (
    <div className="login-page">
      <header className="login-header"></header>
      <div className="login-wrapper">
        <Card title="Login" style={{ width: "300px" }}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
