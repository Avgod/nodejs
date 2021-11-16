import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import {
  Button, Space, PageHeader, Input, DatePicker, Popconfirm, Table, Row, Col, Select, Typography, message
} from 'antd';
import {
  PlusSquareOutlined, BorderOuterOutlined, FundProjectionScreenOutlined
} from '@ant-design/icons';
import axios from 'axios';

const Audit = () => {
  const [checklist, setChecklist] = useState([]);
  const [project, setProject] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [keyCount, setKeyCount] = useState(2);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [inputList, setInputList] = useState(
    {project_name: '', project_id: '', checklist_id: '', place_of_audit: '', audit_start_date: '', audit_end_date: '', description: '', audit_remarks: '', status: ''}
  )

  const [final, setFinal] = useState({masterAudit: '', CheckList:{sendData: [],columnHeaders:[]},teamAudit:''});


  useEffect(() => {
    axios
      .get('http://localhost:4000/checklist/allCheckLists')
      .then((res) => {
        setChecklist(res.data.data);
        console.log('checklist', res.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/projectData/allProjects')
      .then((res) => {
        setProject(res.data.data);
        console.log('project', res.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/employeeData/getEmpdetails')
      .then((res) => {
        setEmployee(res.data.data);
        console.log('employee', res.data.data);
      });
  }, []);

  const [draft, setDraft] = useState('Send Draft');

  const changeButtonName = () => {
    setDraft('Send Final');
  };

  const handleProjectSelect = (value) => {
    setProjectName(value[1]);
    const list = inputList;
    list['project_name'] = value[0];
    list['project_id'] = value[1];
    setInputList(list)
    console.log("val",list)
  };

  const handleStatusSelect = (value) => {
    const list = inputList;
    list['status'] = value;
    setInputList(list)
    console.log("val",list)
  }

  
  const handlePlaceChange = (e) => {
    const {name, value} = e.target
    const list = inputList;
    list[name] = value;
    setInputList(list)
    console.log("////",inputList)
  }

  const handleDateChange = (date,dateString,id) => {
    console.log("date",date)
    if(id === 1){
      const list = inputList;
    list['audit_start_date'] = dateString;
    setInputList(list)
    console.log("val",list)
    }
    else {
      const list = inputList;
    list['audit_end_date'] = dateString;
    setInputList(list)
    console.log("val",list)
    }
    
  }
  
  const handleChecklistClick = (value) => {
    const list = inputList;
    list['checklist_id'] = value[2];
    setInputList(list)
    console.log("val",list)

    let body = {
      checklist_name:value[1]
    }
    console.log('value',body);
    axios
      .post('http://localhost:4000/checklist/checkListData',body)
      .then((res) => {
        console.log('res', res.data.data[0]);
        setTableData(res.data.data[0]);
        setShowTable(true);
      });
  };

  const handleInitiateClick = () => {
    let body=final;
    body['masterAudit'] = inputList;
    body['CheckList']['sendData'] = tableData;
    body['CheckList']['columnHeaders'] = TableColumns;
    body['teamAudit'] = auditTeamData;
    setFinal(body);
    console.log("final",body)
    
    axios
    .post('http://localhost:4000/audit/saveMasterAudit',body)
    .then((res) => {
      console.log('res', res);
      if(res.status === 200) {
        message.success('File Uploaded');
      }
      else{
        message.error('File Not Uploaded');
      }
    });

  }

  // const handleEmployeeSelect = (value) => {
  //   setSelectedEmployee(value[1]);
  // }

  let name = [];
  project.forEach((data, i) => {
    name.push({ id: data.ProjectId, name: data.ProjectName });
  });
  name = name.filter((name, index, self) => index === self.findIndex((t) => (t.name === name.name && t.id === name.id)));

  const onInputChange = (key, index) => (e) => {
    const newData = [...auditTeamData]
    newData[index][key] = e.target.value;
    setAuditTeamData(newData);
    console.log(auditTeamData);
  }

  const onSelectChange = (key, index) => (value) => {
    const newData = [...auditTeamData]
    newData[index][key] = value[1];
    setAuditTeamData(newData);
    console.log('emmpp',value[1]);
    console.log('dsss',auditTeamData);
  }

  const auditTeamColumns = [
    {
      title: 'Team Member',
      dataIndex: 'team_member',
      // width:150,
      render: (text,record,index) => (
        <Select showSearch placeholder="Search to Select" style={{ width: '100%' }} onChange={onSelectChange("team_member", index)}>
          {employee.map((data, i) => (
                    <Select.Option value={[data.employeeName,data.employeeId,i]}>
                          {data.employeeName}
                    </Select.Option>
                  ))}
        </Select>
      )
    },
    {
      title: 'Role',
      dataIndex: 'audit_role',
      render:(text,record,index) => (
        <Input value={text} onChange={onInputChange("audit_role", index)}/>
      )
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      render:(text,record,index) => (
        <Input value={text} onChange={onInputChange("remarks", index)}/>
      )
    },
  ];
  
  const [auditTeamData, setAuditTeamData] = useState([
    {
      key: 1,
      team_member:'',
      audit_role:'',
      remarks:''
    }
  ]); 
  
  // rowSelection object indicates the need for row selection 
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    }
  };

  const handleAddClick = () => {
    let count = keyCount+1;
    const newData = {
      key: keyCount,
      team_member: '',
      audit_role:'',
      remarks:'',
    }
    let columnData = [...auditTeamData, newData]
    // console.log("columnData",columnData)
    setAuditTeamData(columnData)
    setKeyCount(count);
  }

  const handleRemoveClick = (key) => {
    console.log("e",key)
    let arr = [...auditTeamData];
    console.log(arr)
    arr = arr.filter((item) => !key.includes(item.key))
    setAuditTeamData(arr);
    setSelectedRowKeys([]);
    console.log('ddd',arr)
  }
  
  const hasSelected = selectedRowKeys.length > 0;


  // const TableColumn = [
  //   {
  //     title: 'Team Member',
  //     dataIndex: 'team_member',
  //     width: 150,
  //     render: () => (
  //       <Select defaultValue="Select" style={{ width: 120 }} onChange={handleEmployeeSelect}>
  //         {employee.map((data, i) => (
  //                   <Select.Option value={[data.employeeName,data.employeeId]} icon={<UserOutlined />}>
  //                         {data.employeeName}
  //                   </Select.Option>
  //                 ))}
  //       </Select>
  //     )
  //   },
  //   {
  //     title: 'Audit Role',
  //     dataIndex: 'audit_role',
  //     width: 100,
  //   },
  //   {
  //     title: 'Remarks',
  //     dataIndex: 'remarks',
  //     width: 100,
  //   },

  // ];

  // const TableColumnData = [];
  // for (let i = 1; i < 4; i++) {
  //   TableColumnData.push({
  //     team_member:selectedEmployee,
  //     audit_role: 'Audit',
  //     remarks: `Audit ${i}`,

  //   });
  // }

  // console.log("ccccc",TableColumnData);

 
  
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
      title: data.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase()),
      dataIndex: data,
      key: i,
      width: 150,
      render:(text,record,index) => 
      // (
      //    <Input value={text} onChange={onTableInputChange(data, index)}/>
      //  )
      {
        if(text != null) {
          return text;
        }
        return(
          <Input value={text} onChange={onTableInputChange(data, index)}/>
        )
      }
    });
  });


    const onTableInputChange = (key, index) => (e) => {
    const newData = [...tableData]
    newData[index][key] = e.target.value;
    setTableData(newData);
    console.log(tableData);
  }


  const enabled = inputList['project_name'].length > 0 && inputList['checklist_id'].length > 0 && inputList['place_of_audit'].length > 0 && inputList['audit_start_date'].length > 0 && inputList['audit_end_date'].length > 0 && inputList['description'].length > 0 && inputList['audit_remarks'].length > 0 && inputList['status'].length > 0;
  
  return (
    <div>
      <div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px',
        }}
        >
          <div>
            <PageHeader style={{ fontSize: '32px' }}>Audit Details</PageHeader>
          </div>
          <div>
            <Space>
              <Button type="primary">Save</Button>
              <Button type="primary" ghost onClick={handleInitiateClick} disabled={!enabled}>Initiate</Button>
              <Button type="dashed" onClick={changeButtonName}>{draft}</Button>
              <Popconfirm title="Are you sure want to close?" okText="Yes" cancelText="No">
                <Button type="primary" danger>Close</Button>
              </Popconfirm>
            </Space>
          </div>
        </div>
        <div style={{ border: '1px solid black', padding: '30px' }}>
          <div style={{ width: '800px'}}>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography style={{ marginRight: '5px', width: '94px' }}>Project: </Typography>
                <Select defaultValue="select" style={{ width: '300px', marginRight: '30px' }} onChange={handleProjectSelect}>
                  {Object.values(name).map((data, i) => (
                    <Select.Option value={[data.id,data.name]} icon={<FundProjectionScreenOutlined />}>
                          {data.name}
                          {' - '}
                          {data.id}
                        </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography style={{ marginRight: '5px', width: '94px' }}>Checklist: </Typography>
                {/* <Dropdown.Button overlay={menu} icon={<DownOutlined />}>Select Checklist</Dropdown.Button> */}
                <Select defaultValue="select" style={{ width: '310px' }} onChange={handleChecklistClick}>
                  {checklist.map((data, i) => (
                    <Select.Option value={[data.checklist_name,data.checklist_tablename,data.checklist_id]} icon={<FundProjectionScreenOutlined />}>
                          {data.checklist_name}
                        </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography style={{ marginRight: '5px', width: '125px' }}>Project Name: </Typography>
                <Input placeholder="Enter Project Name" prefix={<PlusSquareOutlined />} value={projectName} disabled style={{marginRight: '30px'}}/>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ marginRight: '5px', width: '120px' }}>Place of Audit: </Typography>
                <Input placeholder="Enter Place" prefix={<PlusSquareOutlined/>} name='place_of_audit' id='1' onChange={handlePlaceChange} />
              </Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography style={{ marginRight: '5px', width: '94px' }}>Start Date: </Typography>
                <DatePicker style={{ width: '300px', marginRight: '30px' }} onChange={(date,dateString) => handleDateChange(date,dateString,1)} />
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography style={{ marginRight: '5px', width: '94px' }}>Closure Date: </Typography>
                <DatePicker style={{ width: '310px' }} onChange={(date,dateString) => handleDateChange(date,dateString,2)}/>
              </Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ marginRight: '5px', width: '125px' }}>Audit ID: </Typography>
                <Input placeholder="Enter Audit ID" prefix={<BorderOuterOutlined />} disabled style={{marginRight: '30px'}}/>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ marginRight: '5px', width: '120px' }}>Description:</Typography>
                <Input placeholder="Enter Description" prefix={<BorderOuterOutlined />} name='description' onChange={handlePlaceChange}/>
              </Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ marginRight: '5px', width: '125px' }}>Audit Remarks:</Typography>
                <Input placeholder="Enter Audit Remarks" prefix={<BorderOuterOutlined />} name='audit_remarks' onChange={handlePlaceChange} style={{marginRight: '30px'}}/>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <Typography style={{ marginRight: '5px', width: '90px' }}>Audit Status:</Typography>
                <Select defaultValue="select" style={{ width: '310px' }} onChange={handleStatusSelect}>
                  <Select.Option value="initiated">Initiated</Select.Option>
                  <Select.Option value="in-progress">In Progress</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{ border: '1px solid black', marginTop: '20px', padding: '30px' }}>
          <PageHeader style={{ fontSize: '28px', marginBottom: '16px' }}>Audit Team</PageHeader>
          <Button onClick={handleAddClick}>+</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleRemoveClick(selectedRowKeys)}>
          <Button disabled={!hasSelected} style={{marginLeft:'10px', marginBottom:'10px'}}>-</Button>
          </Popconfirm>
          <Table rowSelection={{...rowSelection}} columns={auditTeamColumns} dataSource={auditTeamData} pagination={false} scroll={{ y: 240 }} />
        </div>
        
        <div style={{marginTop: '20px'}}>

       {showTable && 
          <div>
            <PageHeader style={{ fontSize: '28px', marginBottom: '16px' }}>Audit Report</PageHeader>
            <Table columns={TableColumnsData} dataSource={tableData} scroll={{ x: 200, y: 400 }} bordered pagination={false}/>
        </div>
      }
        </div>

      </div>
    </div>
  );
};

export default Audit;
