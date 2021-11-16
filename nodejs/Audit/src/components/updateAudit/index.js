import React from 'react';
import {
  PageHeader, Menu, Dropdown, Row, Col, Input, DatePicker,
} from 'antd';
import {
  DownOutlined, UserOutlined, PlusSquareOutlined, BorderOuterOutlined,
} from '@ant-design/icons';

const UpdateAudit = () => {
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

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <PageHeader style={{ fontSize: '32px' }}>Update Audit</PageHeader>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '5px' }}>Select Audit: </label>
        <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
      </div>

      <div style={{ border: '1px solid black', padding: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <PageHeader style={{ fontSize: '26px' }}>Audit Details</PageHeader>
        </div>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <label style={{ marginRight: '5px' }}>Project: </label>
            <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Project</Dropdown.Button>
          </Col>
          <Col span={12}>
            <label style={{ marginRight: '5px' }}>Checklist: </label>
            <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Checklist</Dropdown.Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '5px', width: '126px' }}>Project Name: </label>
            <Input placeholder="Enter Project Name" prefix={<PlusSquareOutlined />} />
          </Col>
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '5px', width: '130px' }}>Place of Audit: </label>
            <Input placeholder="Enter Place" prefix={<PlusSquareOutlined />} />
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <label style={{ marginRight: '12px' }}>Start Date: </label>
            <DatePicker style={{ width: '236px' }} />
          </Col>
          <Col span={12}>
            <label style={{ marginRight: '5px' }}>Closure Date: </label>
            <DatePicker style={{ width: '230px' }} />
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '5px', width: '72px' }}>Audit ID: </label>
            <Input placeholder="Enter Audit ID" prefix={<BorderOuterOutlined />} />
          </Col>
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '5px' }}>Description:</label>
            <Input placeholder="Enter Description" prefix={<BorderOuterOutlined />} />
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: '5px', width: '136px' }}>Audit Remarks:</label>
            <Input placeholder="Enter Audit Remarks" prefix={<BorderOuterOutlined />} />
          </Col>
          <Col span={12}>
            <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <label style={{ marginRight: '5px', width: '136px' }}>Audit Status:</label>
              <Input placeholder="Enter Audit Remarks" prefix={<BorderOuterOutlined />} />
            </Col>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default UpdateAudit;
