import React from 'react';
import 'antd/dist/antd.css';
import {
  PageHeader, Menu, Dropdown, Row, Col, DatePicker, Table,
} from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const Role = localStorage.getItem('Role');
  console.log('role', Role);

  const columns = [
    {
      title: 'Process Area',
      dataIndex: 'process_area',
      key: 'process_area',
    },
    {
      title: 'Month 1',
      dataIndex: 'month_1',
      key: 'month_1',
    },
    {
      title: 'Month 2',
      dataIndex: 'month_2',
      key: 'month_2',
    },
    {
      title: 'Sum Count',
      dataIndex: 'sum_count',
      key: 'sum_count',
    },
    {
      title: 'Sum Percentage',
      dataIndex: 'sum_per',
      key: 'sum_per',
    },
  ];

  const data = [];

  for (let i = 1; i < 4; i++) {
    data.push({
      process_area: '',
      month_1: '',
      month_2: '',
      sum_count: '',
      sum_per: '',
    });
  }

  const columns1 = [
    {
      title: 'Parameters',
      dataIndex: 'parameters',
      key: 'parameters',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
  ];

  const data1 = [
    {
      parameters: 'No. of Audit done',
      details: '',
    },
    {
      parameters: 'No. of NCs logged',
      details: '',
    },
    {
      parameters: 'NC closure time',
      details: '',
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Project 1
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Project 2
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Project 3
      </Menu.Item>
    </Menu>
  );

  //       const admin = (
  //           <div>
  //               <div style={{marginBottom: '20px'}}>
  //                 <div style={{marginBottom: '10px'}}>
  //                     <PageHeader style={{fontSize: '32px'}}>Dashboard</PageHeader>
  //                 </div>

  //                 <div style={{marginBottom: '10px'}}>
  //                     <label style={{marginRight: '5px'}}>Select Audit: </label>
  //                     <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
  //                 </div>

  //                 <div style={{border: 'solid 1px black', padding: '10px'}}>
  //                     <div style={{marginBottom: '10px'}}>
  //                     <label style={{marginRight: '5px'}}>Select Project: </label>
  //                         <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
  //                     </div>
  //                     <Row>
  //                         <Col>
  //                             <label style={{marginRight: '5px'}}>Audit Status: </label>
  //                             <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
  //                         </Col>
  //                         <Col>
  //                             <label style={{marginRight: '5px'}}>Audit Type: </label>
  //                             <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
  //                         </Col>
  //                     </Row>
  //                     <div style={{border: 'solid 1px black', maxWidth: '50%', margin: '10px'}}>
  //                         <Row style={{marginBottom: '10px'}}>
  //                             <Col span={12}>
  //                                 <label style={{marginRight: '12px'}}>Start Date: </label>
  //                                 <DatePicker style={{width: '236px'}} />
  //                             </Col>
  //                             <Col span={12}>
  //                                 <label style={{marginRight: '5px'}}>End Date: </label>
  //                                 <DatePicker style={{width: '230px'}} />
  //                             </Col>
  //                         </Row>
  //                     </div>
  //                 </div>
  //             </div>

  //              <div style={{marginBottom: '20px'}}>
  //                 <div style={{marginBottom: '10px'}}>
  //                     <PageHeader style={{fontSize: '28px'}}>Audit Summary</PageHeader>
  //                 </div>
  //                 <div>
  //                 <Table columns={columns1} dataSource={data1} bordered={true} pagination={false}/>
  //                 </div>
  //             </div>

  //             <div>
  //                 <div style={{marginBottom: '10px'}}>
  //                     <PageHeader style={{fontSize: '28px'}}>Audit Details</PageHeader>
  //                 </div>
  //                 <div>
  //                 <Table columns={columns} dataSource={data} bordered={true} pagination={false}/>
  //                 </div>
  //             </div>
  //           </div>

  //       )

  //       return (
  //         <div>
  //             {(Role === 'admin') ? admin : <h1>No Access</h1>}
  //         </div>
  //     )
  // }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <PageHeader style={{ fontSize: '32px' }}>Dashboard</PageHeader>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '5px' }}>Select Audit: </label>
          <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
        </div>

        <div style={{ border: 'solid 1px black', padding: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Select Project: </label>
            <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
          </div>
          <Row>
            <Col>
              <label style={{ marginRight: '5px' }}>Audit Status: </label>
              <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
            </Col>
            <Col>
              <label style={{ marginRight: '5px' }}>Audit Type: </label>
              <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
            </Col>
          </Row>
          <div style={{ border: 'solid 1px black', maxWidth: '50%', margin: '10px' }}>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={12}>
                <label style={{ marginRight: '12px' }}>Start Date: </label>
                <DatePicker style={{ width: '236px' }} />
              </Col>
              <Col span={12}>
                <label style={{ marginRight: '5px' }}>End Date: </label>
                <DatePicker style={{ width: '230px' }} />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <PageHeader style={{ fontSize: '28px' }}>Audit Summary</PageHeader>
        </div>
        <div>
          <Table columns={columns1} dataSource={data1} bordered pagination={false} />
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '10px' }}>
          <PageHeader style={{ fontSize: '28px' }}>Audit Details</PageHeader>
        </div>
        <div>
          <Table columns={columns} dataSource={data} bordered pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
