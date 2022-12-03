import React, { useReducer, useState, useEffect } from 'react';
import { Button, Table } from 'antd';
const columns = [
  {
    title: 'Employee ID',
    dataIndex: 'id',
  },
  {
    title: 'Employee Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
];
const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/table_data")
    .then(response => response.json()
    .then(result => {
    
      var data_list = []
      result['employees'].map(items =>{
        var data_dict = {}
        data_dict.key = items[0];
        data_dict.id = items[0];
        data_dict.name = items[1];
        data_dict.salary = items[2];
        data_list.push(data_dict);

      })

      console.log("Data list finfla ; ", data_list);

      setData(data_list);
    })
  )}, []);


  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default App;