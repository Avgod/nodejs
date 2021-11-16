import React from 'react';
import {
  Form, Input, Button, PageHeader,
} from 'antd';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();

  const [form] = Form.useForm();

  //   const onReset = () => {
  //     form.resetFields();
  //   };

  const onFinish = (values) => {
    console.log(values);
    fetch('http://18.119.97.234:4000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          history.push('./');
        }
      });
  };

  return (
    <div style={{
      height: '100vh', backgroundColor: '#F4F5F7', display: 'flex', justifyContent: 'center',
    }}
    >
      <div>
        <PageHeader style={{
          fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', marginTop: '30px',
        }}
        >
          Sign Up to Audit
        </PageHeader>
        <Form form={form} name="SignUp" onFinish={onFinish} className="form" layout="vertical">
          <Form.Item
            name="name"
            label="Fullname"
            rules={[
              {
                required: true,
                message: 'Please input your fullname',
              },
            ]}
          >
            <Input type="text" placeholder="Fullname" />
          </Form.Item>
          <Form.Item
            name="employeeID"
            label="EmployeeID"
            rules={[
              {
                required: true,
                message: 'Please input Employee ID',
              },
            ]}
          >
            <Input type="text" placeholder="EmployeeID" />
          </Form.Item>
          <Form.Item
            name="emailID"
            label="Email-ID"
            rules={[
              {
                required: true,
                message: 'Please input your E-mail',
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your password',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ fontWeight: 'bold', height: 'auto', padding: '6px 15px' }}>
              Sign Up
            </Button>
            {/* <Button type="primary" danger block htmlType="button" onClick={onReset}>
                        Reset
                        </Button> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
