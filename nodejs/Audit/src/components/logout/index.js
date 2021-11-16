import React from 'react';
import {Button, Table} from 'antd';
import {useState} from 'react'
import 'antd/dist/antd.css';
import axios from 'axios';


const Logout = () => {

  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false)

  
  const handleSavebtn = () => {
    let body = {
      checklist_name:'cl_6_sssss'
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
    });
  });

  const handleClear = () => {
    localStorage.removeItem('accessToken');
  }

  return (
    <div>
      <h1>Report Page</h1>
      <Button onClick={handleSavebtn} style={{marginBottom:'10px'}}>save</Button>
      <Button onClick={handleClear} style={{marginBottom:'10px'}}>clear</Button>
      {showTable && <Table columns={TableColumnsData} dataSource={tableData} scroll={{ x: 200, y: 400 }} bordered pagination={false}/>}
    </div>
  );
}
export default Logout;





// import React from 'react';
// import {Button, Table, Form, Input} from 'antd';
// import {useState,useEffect, useContext, useRef} from 'react'
// import 'antd/dist/antd.css';
// import axios from 'axios';
// const EditableContext = React.createContext(null);


// const Logout = () => {

//   const [tableData, setTableData] = useState([]);
//   const [showTable, setShowTable] = useState(false)

//   const EditableRow = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

// const EditableCell = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef(null);
//   const form = useContext(EditableContext);
//   useEffect(() => {
//     if (editing) {
//       inputRef.current.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({
//       [dataIndex]: record[dataIndex]
//     });
//   };

//   const save = async () => {
//     try {
//       const values = await form.validateFields();
//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       console.log("Save failed:", errInfo);
//     }
//   };

//   let childNode = children;

//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{
//           margin: 0
//         }}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} is required.`
//           }
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{
//           paddingRight: 24
//         }}
//         onClick={toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   }

//   return <td {...restProps}>{childNode}</td>;
// };

// const components = {
//   body: {
//     row: EditableRow,
//     cell: EditableCell
//   }
// };

//   const handleSavebtn = () => {
//     let body = {
//       checklist_name:'cl_1_checklist'
//     }
//     axios
//       .post('http://localhost:4000/checklist/checkListData',body)
//       .then((res) => {
//         console.log('res', res.data.data[0]);
//         setTableData(res.data.data[0]);
//         setShowTable(true);
//       });
//   };

//   const TableColumns = [];
//   tableData.forEach((data, i) => {
//     for (const k in data) {
//       if (TableColumns.indexOf(k) === -1) {
//         TableColumns.push(k);
//       }
//     }
//   });

//   const TableColumnsData = [];
//   TableColumns.forEach((data, i) => {
//     TableColumnsData.push({
//       title: data.replace(/_/g, ' '),
//       dataIndex: data,
//       key: i,
//       width: 150,
//       editable: true
//     });
//   });


//   const handleSave = (row) => {
//     console.log('row',row)
//     const newData = [...tableData];
//     const index = newData.findIndex((item) => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, { ...item, ...row });
//     setTableData(newData)
//   };

//   const columns = TableColumnsData.map(col => {
//     if(!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: record => ({
//         record,
//         editable: col.editable,
//         dataIndex: col.dataIndex,
//         title: col.title.replace(/_/g, ' '),
//         handleSave: handleSave
//       })
//     }
//   })

//   console.log("col",columns)

//   return (
//     <div>
//       <h1>Report Page</h1>
//       <Button onClick={handleSavebtn} style={{marginBottom:'10px'}}>save</Button>
//       {showTable && <Table components={components} columns={columns} dataSource={tableData} scroll={{ x: 200, y: 400 }} bordered pagination={false}/>}
//     </div>
//   );
// }
// export default Logout;
