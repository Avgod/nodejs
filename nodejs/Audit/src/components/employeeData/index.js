import React, { useState } from 'react';
import 'antd/dist/antd.css';
import * as XLSX from 'xlsx';
import {
  Table, Button, Space, Popconfirm, Upload, PageHeader, Modal, Form, Input, Row, Col, message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EmployeeData = () => {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sendData, setSendData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const [form] = Form.useForm();

  const handleUpload = (e) => {
    setShowTable(true);
    console.log('file imported -->', e.file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const wb = XLSX.read(data, { type: 'binary' });
      const sheet = wb.SheetNames[0];
      const excel = wb.Sheets[sheet];
      const excel_data = XLSX.utils.sheet_to_json(excel).map((row) => Object.keys(row).reduce((obj, key) => {
        obj[key.trim()] = row[key];
        return obj;
      }, {}));
      console.log('sheet data', excel_data);
      setTableData(excel_data);
      setSendData(excel_data);
    };
    reader.readAsBinaryString(e.file);
  };

  const TableColumns = [];
  tableData.forEach((data, i) => {
    for (const k in data) {
      if (TableColumns.indexOf(k) === -1) {
        TableColumns.push(k);
      }
    }
  });

  const TableColumnsData = [];
  TableColumns.forEach((data, i) => {
    TableColumnsData.push({
      title: data,
      dataIndex: data,
      key: i,
      width: 150,
    });
  });

  const handleSaveClick = (sendData) => {
    console.log('send data', sendData);
    fetch('http://localhost:4000/employeeData/saveEmpDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    }).then((Data) => {
      console.log("res",Data);
      if(Data.status === 201) {
        message.success('File Uploaded');
      }
      else{
        message.error('File Not Uploaded');
      }
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  // const handleOk = () => {
  //     setVisible(false);
  // }

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    setShowTable(true);
    setVisible(false);
    const formdata = [values];
    setTableData(formdata);
    setSendData(formdata);
  };

  const handleSearch = (value) => {
    const filteredData = tableData.filter((key) => Object.keys(key).some((data) => String(key[data])
      .toLowerCase()
      .includes(value.toLowerCase())));
    setFilterTable(filteredData);
  };

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px',
      }}
      >
        <div>
          <PageHeader style={{ fontSize: '32px' }}>Empoyee Data</PageHeader>
        </div>
        <div>
          <Space>
            <Input.Search placeholder="Search by.." onSearch={handleSearch} enterButton />
            <Upload
              accept=".xlsx, .xlsm"
              showUploadList={false}
              beforeUpload={(file) =>
                // Prevent upload
                false}
              onChange={handleUpload}
            >
              <Button type="primary">
                <UploadOutlined />
                Upload Data
</Button>
            </Upload>
            <Button type="primary" onClick={showModal}>Add</Button>
            <Button type="primary" ghost onClick={() => handleSaveClick(sendData)}>Save</Button>
            <Popconfirm title="Are you sure delete this Record?" okText="Yes" cancelText="No">
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
      {showTable && <Table columns={TableColumnsData} dataSource={filterTable === null ? tableData : filterTable} pagination={false} bordered scroll={{ x: 200, y: 400 }} />}
      <Modal
        title="Add Employee"
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Employee ID"
name="Emp ID"
style={{ width: '90%' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Employee ID!',
                  },
                ]}
              >
                <Input type="number" placeholder="Employee ID" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employee Name"
name="Emp Name"
style={{ width: '90%' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Employee Name!',
                  },
                ]}
              >
                <Input type="text" placeholder="Employee Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Email ID"
name="Email ID"
style={{ width: '90%' }}
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter valid Email ID!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Department"
name="Department"
style={{ width: '90%' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Department!',
                  },
                ]}
              >
                <Input type="text" placeholder="Department" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Role"
name="Role"
style={{ width: '90%' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Role!',
                  },
                ]}
              >
                <Input type="text" placeholder="Role" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Manager ID"
name="Manager ID"
style={{ width: '90%' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Manager ID!',
                  },
                ]}
              >
                <Input type="number" placeholder="Manager ID" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeData;
