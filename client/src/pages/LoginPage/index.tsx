import {FC} from "react";

import {Button, Form, Input} from "antd";
import Title from "antd/lib/typography/Title";

import styles from './LoginPage.module.css'

const LoginPage:FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Form
      name="login"
      className={styles.form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={4} className={styles.title}>Авторизуйтесь</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Поле повинно бути заповнене' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Поле повинно бути заповнене' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button className={styles.submit} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginPage;