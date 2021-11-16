import React, { useState } from 'react';
import 'antd/dist/antd.css';
import * as XLSX from 'xlsx';
import {
  Table, Button, Space, Popconfirm, Upload, PageHeader, Input, message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ProjectData = () => {
  // const [isTableVisible, setIsTableVisible] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tableData, seTableData] = useState([]);
  const [sendData, setSendData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);

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
      seTableData(excel_data);
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
    fetch('http://localhost:4000/projectData/saveProjectData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    }).then((Data) => {
      console.log(Data);
      if(Data.status === 201) {
        message.success('File Uploaded');
      }
      else{
        message.error('File Not Uploaded');
      }
    });
  };

  const handleSearch = (value) => {
    const filteredData = tableData.filter((key) => Object.keys(key).some((data) => String(key[data])
      .toLowerCase()
      .includes(value.toLowerCase())));
    setFilterTable(filteredData);
  };

  //   const showTable = () => {
  //       setIsTableVisible(true);
  //   }

  //   const TeamColumns = [
  //       {
  //           title: 'SR No',
  //           dataIndex: 'sr_no',
  //           width: 120,
  //       },
  //       {
  //         title: 'EMP ID',
  //         dataIndex: 'emp_id',
  //         width: 120,
  //     },
  //     {
  //         title: 'EMP Name',
  //         dataIndex: 'emp_name',
  //         width: 120,
  //     },
  //     {
  //         title: 'Role',
  //         dataIndex: 'role',
  //         width: 120,
  //     },
  //   ]

  //   const TeamColumnData = [];
  //   for (let i = 1; i < 4; i++) {
  //         TeamColumnData.push({
  //           key: i,
  //           sr_no: `${i}`,
  //           emp_id: `0${i}`,
  //           emp_name: `Avin Employee ${i}`,
  //           role: 'SE',

  //         });
  //   }

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px',
      }}
      >
        <div>
          <PageHeader style={{ fontSize: '32px' }}>Project Data</PageHeader>
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
            <Button type="primary" ghost onClick={() => handleSaveClick(sendData)}>Save</Button>
            <Popconfirm title="Are you sure delete this Record?" okText="Yes" cancelText="No">
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </div>
      </div>
      {showTable && <Table columns={TableColumnsData} dataSource={filterTable === null ? tableData : filterTable} scroll={{ x: 200, y: 400 }} bordered pagination={false} style={{ marginBottom: '30px' }} />}
      {/* {isTableVisible && <div><PageHeader style={{fontSize: '28px', marginBottom: '16px'}}>Team Details</PageHeader><Table columns={TableColumnsData} dataSource={tableData} pagination={false} bordered /></div> } */}
    </div>
  );
};

export default ProjectData;
