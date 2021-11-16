import React, { useState } from 'react';
import 'antd/dist/antd.css';
import * as XLSX from 'xlsx';
import {
  Table, Button, Space, Popconfirm, Upload, PageHeader, Input, message
} from 'antd';
import { UploadOutlined, UserOutlined, DatabaseFilled } from '@ant-design/icons';

const Checklist = () => {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sendData, setSendData] = useState([]);
  const [checklistname, setChecklistName] = useState('');
  const [checklisttype, setChecklistType] = useState('');

  const handleUpload = (e) => {
    setShowTable(true);
    console.log('file imported -->', e.file.name);
    const reader = new FileReader();
    // evt = on_file_select event
    reader.onload = (e) => {
      /* Parse data */
      const data = e.target.result;
      const wb = XLSX.read(data, { type: 'binary' });
      const sheet = wb.SheetNames[0];
      const excel = wb.Sheets[sheet];
      const excel_entry = XLSX.utils.sheet_to_json(excel, { header: 1, blankrows: false });
      console.log('Sheet data', excel_entry);

      const excel_data = [];
      excel_entry.forEach((data, i) => {
        if (data[0] === undefined) {
          data.shift();
          excel_data.push(data);
        } else {
          excel_data.push(data);
        }
      });
      console.log('excel data', excel_data);

      const heading_name = [];
      excel_data.forEach((data) => {
        if (data.length === 1) {
          const index = excel_data.indexOf(data);
          heading_name.push(index);
        }
      });
      console.log("heading name",heading_name.length);

      if (heading_name.length > 1) {
        let Table_data = [];
        for (let i = 0; i < heading_name.length; i++) {
          const array = excel_data.slice(heading_name[i], heading_name[i + 1]);

          const keys = array[1];
          console.log('keys',keys)

          const values = array.slice(2);

          let objects = values.map((array) => {
            const object = {};
            keys.forEach((key, i) => object[key.trim()] = array[i]);
            return object;
          });
          
          if (array[0].length === 1) {
            // Object.keys(objects).map((obj) => objects[obj].Type = array[0].toString());
           objects = objects.map((obj,i) => {
            let keyValues = Object.entries(obj); 
            keyValues.splice(1,0,['Type',array[0].toString()]); 
            obj = Object.fromEntries(keyValues) 
            return obj;
            })
          }
          console.log('objects',objects)
          Table_data = [...Table_data, ...objects];
        }
        console.log("Table data",Table_data)

        const result = [];
        Table_data.forEach((data) => {
          const entries = Object.entries(data);
          const filtered = entries.filter(([key, val]) => val !== undefined);
          const output = Object.fromEntries(filtered);
          result.push(output);
        });

        // console.log('filtered columns', result);
        setTableData(result);

        // Table_data.forEach((obj) => {
        //   Object.keys(obj).forEach((key) => {
        //     const trimmedKey = key.trim();
        //     if (key !== trimmedKey) {
        //       obj[trimmedKey] = obj[key];
        //       delete obj[key];
        //     }
        //   });
        // });
        console.log('Original columns', Table_data);
        setSendData(Table_data);
      } else {
        const keys = excel_data[1];
        const values = excel_data.slice(2);

        let objects = values.map((array) => {
          const object = {};
          keys.forEach((key, i) => object[key] = array[i]);
          return object;
        });

        if (excel_data[0].length === 1) {
          // Object.keys(objects).map((obj) => objects[obj].Type = excel_data[0].toString());
          objects = objects.map((obj,i) => {
            let keyValues = Object.entries(obj); 
            keyValues.splice(1,0,['Type',excel_data[0].toString()]); 
            obj = Object.fromEntries(keyValues) 
            return obj;
            })
        }

        const result = [];
        objects.forEach((data) => {
          const entries = Object.entries(data);
          const filtered = entries.filter(([key, val]) => val !== undefined);
          const output = Object.fromEntries(filtered);
          result.push(output);
        });

        // console.log('filtered columns', result);
        setTableData(result);

        // objects.forEach((obj) => {
        //   Object.keys(obj).forEach((key) => {
        //     const trimmedKey = key.trim();
        //     if (key !== trimmedKey) {
        //       obj[trimmedKey] = obj[key];
        //       delete obj[key];
        //     }
        //   });
        // });
        console.log('Original columns', objects);
        setSendData(objects);
      }
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

  const ColumnHeader = [];
  sendData.forEach((header, j) => {
    for (const l in header) {
      if (ColumnHeader.indexOf(l) === -1) {
        ColumnHeader.push(l);
      }
    }
  });
  // console.log('tablecolumns', ColumnHeader);

  const TableColumnsData = [];
  TableColumns.forEach((data, i) => {
    TableColumnsData.push({
      title: data,
      dataIndex: data,
      key: i,
      width: 150,
    });
  });

  const handleNameChange = (e) => {
    setChecklistName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setChecklistType(e.target.value);
  };

  const handleSaveClick = (sendData, ColumnHeader) => {
    const obj = {
      name: checklistname,
      type: checklisttype,
    };
    console.log('object', obj);
    console.log('send data', sendData);
    console.log('ColumnHeader', ColumnHeader);
    fetch('http://localhost:4000/checklist/saveChecklist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ColumnHeader, sendData, obj}),
    }).then((Data) => {
      console.log(Data);
      if(Data.status === 200) {
        message.success('File Uploaded');
      }
      else{
        message.error('File Not Uploaded');
      }
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <PageHeader style={{ fontSize: '32px' }}>Checklist</PageHeader>
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
            <label style={{ marginRight: '5px' }}>Name: </label>
            <Input placeholder="Enter Checklist Name" prefix={<UserOutlined />} onChange={handleNameChange} />
          </div>
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          }}
          >
            <label style={{ marginRight: '5px' }}>Type:</label>
            <Input placeholder="Enter Checklist Type" prefix={<DatabaseFilled />} onChange={handleTypeChange} />
          </div>
        </div>
        <div>
          <Space>
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
                Upload Checklist
</Button>
            </Upload>
            <Button type="primary" ghost onClick={() => handleSaveClick(sendData, ColumnHeader)}>Save</Button>
            <Popconfirm title="Are you sure delete this Record?" okText="Yes" cancelText="No">
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        </div>
      </div>

      {showTable && <Table columns={TableColumnsData} dataSource={tableData} rowKey={Math.random().toString()} scroll={{ x: 200, y: 400 }} pagination={false} bordered />}
    </div>
  );
};

export default Checklist;
