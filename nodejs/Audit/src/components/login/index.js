import React from 'react';
import 'antd/dist/antd.css';
import {
  Form, Input, Button, PageHeader,
} from 'antd';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    // let result = '';
    fetch('http://18.119.97.234:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push('./audit-tool');
          console.log('connected to Database SuccessFully');
        }

        return response.text();
      })
      .then((res) => {
        console.log(JSON.parse(res));
        const result = JSON.parse(res);
        console.log('res', result.confirmRole);
        console.log('res', result.accessToken);
        localStorage.setItem('Role', result.confirmRole);
        localStorage.setItem('accessToken', result.accessToken);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSignupClick = () => {
    history.push('./signup');
  };

  return (
    <div style={{
      height: '100vh', backgroundColor: '#F4F5F7', display: 'flex', justifyContent: 'center',
    }}
    >
      <div>
        <PageHeader style={{
          fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', marginTop: '80px',
        }}
        >
          Login to Audit
        </PageHeader>
        <Form
          name="basic"
          layout="vertical"
          className="form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input type="text" placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
  fontWeight: 'bold', height: 'auto', padding: '6px 15px', marginTop: '10px',
}}
            >
              Login
</Button>
          </Form.Item>
        </Form>
        <hr />
        <Button
          block
          onClick={handleSignupClick}
          style={{
            fontWeight: 'bold', height: 'auto', padding: '6px 15px', marginTop: '10px', color: 'white',
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;
