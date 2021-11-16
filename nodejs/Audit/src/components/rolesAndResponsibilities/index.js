import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
  Table, Button, Space, PageHeader, Input, Modal, Select,
} from 'antd';
import { UserOutlined, CopyFilled, LogoutOutlined } from '@ant-design/icons';

const RolesAndResponsibilities = () => {
  const Role = localStorage.getItem('Role');
  console.log('role', Role);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const RoleColumns = [
    {
      title: 'SR No',
      dataIndex: 'sr_no',
      width: 150,
    },
    {
      title: 'EMP ID',
      dataIndex: 'emp_id',
      width: 150,
    },
    {
      title: 'EMP Name',
      dataIndex: 'emp_name',
      width: 150,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: 150,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 150,
    },
    {
      title: 'Access Level',
      dataIndex: 'access_level',
      width: 150,
      render: () => (
        <Select defaultValue="Admin" style={{ width: 120 }} onChange={handleChange}>
          <Select.Option value="administrator">Admin</Select.Option>
          <Select.Option value="seller">Super User</Select.Option>
          <Select.Option value="customer">User</Select.Option>
        </Select>
      ),
    },
  ];

  const RolesColumnData = [];
  for (let i = 1; i < 4; i++) {
    RolesColumnData.push({
      key: i,
      sr_no: `${i}`,
      emp_id: `0${i}`,
      emp_name: `Avin Employee ${i}`,
      department: 'Avin',
      role: 'SE',
      // access_level: '',
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const RolesnRespPermission = (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <PageHeader style={{ fontSize: '32px' }}>Roles And Responsibilities</PageHeader>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}
        >
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '20px',
          }}
          >
            <label style={{ marginRight: '5px' }}>User: </label>
            <Input placeholder="Enter User" prefix={<UserOutlined />} />
          </div>
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <label style={{ marginRight: '5px' }}>Department:</label>
            <Input placeholder="Enter Department" prefix={<CopyFilled />} />
          </div>
        </div>
        <div>
          <Space>
            <Button type="primary">Save</Button>
            <Button type="dashed">Undo</Button>
            <Button onClick={showModal} danger>Add/Delete Role</Button>
          </Space>
        </div>
      </div>
      <Table columns={RoleColumns} dataSource={RolesColumnData} pagination={false}>
        {/* <tr rowkey={item => item.indexTypeId} dataSource={selectIndexTypeKeyTypes} column={colmns} /> */}
      </Table>

      <Modal title="Update Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
        }}
        >
          <PageHeader style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Add/Delete/modify Role</PageHeader>
          <div>
            <div style={{
              display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
            }}
            >
              <label style={{ marginRight: '5px', width: '115px' }}>Role Type:</label>
              <Input placeholder="Role Type" prefix={<LogoutOutlined />} />
            </div>
            <div style={{
              display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
            }}
            >
              <label style={{ marginRight: '5px', width: '115px' }}>Role name:</label>
              <Input placeholder="Role Name" prefix={<LogoutOutlined />} />
            </div>
            <div style={{
              display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            }}
            >
              <label style={{ marginRight: '5px', width: '115px' }}>Access Level:</label>
              <Select defaultValue="1" style={{ width: '200px' }} onChange={handleChange}>
                <Select.Option value="administrator">1</Select.Option>
                <Select.Option value="seller">2</Select.Option>
                <Select.Option value="customer">3</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: '83%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'right',
        }}
        >
          <Space>
            <Button type="primary" danger>Delete</Button>
            <Button type="primary">Save</Button>
          </Space>
        </div>
      </Modal>
    </div>
  );

  return (
    <div>
      {(Role === 'admin') ? RolesnRespPermission : <h1>No Access</h1>}
    </div>
  );
};

export default RolesAndResponsibilities;

// import React, {useState} from 'react';
// import 'antd/dist/antd.css';
// import { Table, Button, Space, PageHeader, Input, Modal } from 'antd';
// import { UserOutlined, CopyFilled, LogoutOutlined } from '@ant-design/icons';

// const RolesAndResponse = () => {

//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const RoleColumns = [
//         {
//           title: 'SR No',
//           dataIndex: 'sr_no',
//           width: 150,
//         },
//         {
//           title: 'EMP ID',
//           dataIndex: 'emp_id',
//           width: 150,
//         },
//         {
//           title: 'EMP Name',
//           dataIndex: 'emp_name',
//           width: 150,
//         },
//         {
//           title: 'Department',
//           dataIndex: 'department',
//           width: 150,
//         },
//         {
//           title: 'Role',
//           dataIndex: 'role',
//           width: 150,
//         },
//         {
//             title: 'Access Level',
//             dataIndex: 'access_level',
//             width: 150,
//           },
//       ];

//       const RolesColumnData = [];
//       for (let i = 1; i < 4; i++) {
//         RolesColumnData.push({
//             key: i,
//             sr_no: `${i}`,
//             emp_id: `0${i}`,
//             emp_name: `Avin Employee ${i}`,
//             department: 'Avin',
//             role: 'SE',
//             access_level:'dropdown',
//         });
//     }

//     const showModal = () => {
//         setIsModalVisible(true);
//       };

//       const handleOk = () => {
//         setIsModalVisible(false);
//       };

//       const handleCancel = () => {
//         setIsModalVisible(false);
//       };

//     return (
//         <div>
//             <div style={{marginBottom: '16px'}}>
//                 <PageHeader style={{fontSize: '32px'}}>Roles And Responsibilities</PageHeader>
//             </div>
//             <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' , marginBottom: '20px'}}>
//                 <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
//                     <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '20px'}}>
//                         <label style={{marginRight: '5px'}}>User: </label>
//                         <Input placeholder='Enter User' prefix={<UserOutlined />} />
//                     </div>
//                     <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
//                         <label style={{marginRight: '5px'}}>Department:</label>
//                         <Input placeholder='Enter Department' prefix={<CopyFilled />} />
//                     </div>
//                 </div>
//                 <div>
//                     <Space>
//                         <Button type='primary'>Save</Button>
//                         <Button type='dashed'>Undo</Button>
//                         <Button onClick={showModal} danger>Add/Delete Role</Button>
//                     </Space>
//                 </div>
//             </div>
//            <Table columns={RoleColumns} dataSource={RolesColumnData} pagination={false} />

//            <Modal title="Update Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
//            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
//            <PageHeader style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '16px'}}>Add/Delete/modify Role</PageHeader>
//                <div>
//                     <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
//                         <label style={{marginRight: '5px', width: '115px'}}>Role Type:</label>
//                         <Input placeholder='Role Type' prefix={<LogoutOutlined />} />
//                     </div>
//                     <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom: '16px'}}>
//                          <label style={{marginRight: '5px', width: '115px'}}>Role name:</label>
//                          <Input placeholder='Role Name' prefix={<LogoutOutlined />} />
//                     </div>
//                     <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
//                          <label style={{marginRight: '5px', width: '115px'}}>Access Level:</label>
//                          <Input placeholder='Access Level' prefix={<LogoutOutlined />} />
//                     </div>
//                 </div>
//                 </div>
//                 <div style={{maxWidth: '83%', display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'right'}}>
//                         <Space>
//                         <Button type="primary" danger>Delete</Button>
//                         <Button type="primary">Save</Button>
//                         </Space>
//                     </div>
//            </Modal>
//         </div>
//     )
// }

// export default RolesAndResponse
