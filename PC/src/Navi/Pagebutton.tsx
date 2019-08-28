import React, { Component } from 'react';
// // import Button from 'antd/es/button';
// import { Button } from 'antd';
// import '../App.css';

// class Pagebutton extends Component {
//   render() {
//     return (
//       <div className="Pagebutton">
//         <Button type="primary">Pagebutton</Button>
//       </div>
//     );
//   }
// }

// export default Pagebutton;

import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class Pagebutton extends Component {
  render() {
    return (
        <Table columns={columns} dataSource={data} />
    );
  }
}

export default Pagebutton;