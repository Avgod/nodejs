import {Button, Table, Input} from 'antd';
import {useState} from 'react'
import 'antd/dist/antd.css';
import axios from 'axios';


const Reports = () => {

  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false)
  
  const handleSave = () => {
    let body = {
      checklist_name:'cl_1_checklist'
    }
    axios
      .post('http://localhost:4000/checklist/checkListData',body)
      .then((res) => {
        console.log('res', res.data.data[0]);
        setTableData(res.data.data[0]);
        setShowTable(true);
      });
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
      title: data.replace(/_/g, ' '),
      dataIndex: data,
      key: i,
      width: 150,
      render:(text,record,index) => (
        <Input value={text} onChange={onTableInputChange(data, index)}/>
      )
    });
  });

  const onTableInputChange = (key, index) => (e) => {
    // console.log('key',key);
    // console.log('index',index);
    // console.log('e',e.target.value);
    const newData = [...tableData]
    newData[index][key] = e.target.value;
    setTableData(newData);
    console.log(tableData);
  }

  const handleSend = (tableData) => {
    console.log('tableData',tableData)
  }

  return (
    <div>
      <h1>Report Page</h1>
      <Button onClick={handleSave} style={{marginBottom:'10px'}}>save</Button>
      <Button onClick={() => handleSend(tableData)} style={{marginBottom:'10px'}}>send</Button>
      {showTable && <Table columns={TableColumnsData} dataSource={tableData} scroll={{ x: 200, y: 400 }} bordered pagination={false}/>}
      <Input />
    </div>
  );
};

 export default Reports;










// import {Button} from 'antd';
// import 'antd/dist/antd.css';
// import axios from 'axios';


// const Reports = () => {

//   const [tableData, setTableData] = useState([]);

//   const handleSave = () => {
//     let body = {
//       checklist_name:'cl_1_checklist'
//     }
//     axios
//       .post('http://localhost:4000/checklist/checkListData',body)
//       .then((res) => {
//         console.log('res', res.data.data[0]);
//       });
//   };

//   return (
//     <div>
//       <h1>Report Page</h1>
//       <Button onClick={handleSave}>save</Button>
//     </div>
//   );
// };

//  export default Reports;




// import React,{useState, useEffect} from 'react';
// import { Button, Table, Popconfirm, Input, Select} from 'antd';
// import 'antd/dist/antd.css';
// import axios from 'axios';


// const Reports = () => {

//   const [keyCount, setKeyCount] = useState(2);
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);


//   const [employee, setEmployee] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:4000/employeeData/getEmpdetails')
//       .then((res) => {
//         setEmployee(res.data.data);
//         // console.log('employee', res.data.data);
//       });
//   }, []);


//   const onInputChange = (key, index) => (e) => {
//     const newData = [...auditTeamData]
//     newData[index][key] = e.target.value;
//     setAuditTeamData(newData);
//     console.log(auditTeamData);
//   }

//   const onSelectChange = (key, index) => (value) => {
//     const newData = [...auditTeamData]
//     newData[index][key] = value[1];
//     setAuditTeamData(newData);
//     console.log('emmpp',value[1]);
//     console.log('dsss',auditTeamData);
//   }

//   const auditTeamColumns = [
//     {
//       title: 'Team Member',
//       dataIndex: 'team_memenber',
//       width:150,
//       render: (text,record,index) => (
//         <Select defaultValue="Select" style={{ width: 120 }} onChange={onSelectChange("team_memenber", index)}>
//           {employee.map((data, i) => (
//                     <Select.Option value={[data.employeeName,data.employeeId,i]}>
//                           {data.employeeName}
//                     </Select.Option>
//                   ))}
//         </Select>
//       )
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       render:(text,record,index) => (
//         <Input value={text} onChange={onInputChange("role", index)}/>
//       )
//     },
//     {
//       title: 'Remarks',
//       dataIndex: 'remarks',
//       render:(text,record,index) => (
//         <Input value={text} onChange={onInputChange("remarks", index)}/>
//       )
//     },
//   ];
  
//   const [auditTeamData, setAuditTeamData] = useState([
//     {
//       key: 1,
//       team_memenber:'',
//       role:'',
//       remarks:''
//     }
//   ]); 
  
//   // rowSelection object indicates the need for row selection 
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (selectedRowKeys, selectedRows) => {
//       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//       setSelectedRowKeys(selectedRowKeys);
//     }
//   };

//   const handleAddClick = () => {
//     let count = keyCount+1;
//     const newData = {
//       key: keyCount,
//       team_memenber: '',
//       role:'',
//       remarks:'',
//     }
//     let columnData = [...auditTeamData, newData]
//     // console.log("columnData",columnData)
//     setAuditTeamData(columnData)
//     setKeyCount(count);
//   }

//   const handleRemoveClick = (key) => {
//     console.log("e",key)
//     let arr = [...auditTeamData];
//     console.log(arr)
//     arr = arr.filter((item) => !key.includes(item.key))
//     setAuditTeamData(arr);
//     setSelectedRowKeys([]);
//     console.log('ddd',arr)
//   }
  
//   const hasSelected = selectedRowKeys.length > 0;


//   return (
//     <div>
//       <h1>Report Page</h1>
//       <Button onClick={handleAddClick}>+</Button>
//       <Popconfirm title="Sure to delete?" onConfirm={() => handleRemoveClick(selectedRowKeys)}>
//         <Button disabled={!hasSelected} style={{marginLeft:'10px', marginBottom:'10px'}}>-</Button>
//       </Popconfirm>
//       <Table
//         rowSelection={{...rowSelection}}
//         columns={auditTeamColumns}
//         dataSource={auditTeamData}
//         pagination={false}
//       />
//     </div>
//   );
// }
// export default Reports;




