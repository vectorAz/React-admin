import React, { Component } from 'react';
import { Card,Button,Table   } from 'antd';
import './index.less'
import Mybutton from '../my-button/button'
export default class Category extends Component {
  onShowSizeChange=(current, pageSize)=> {
    console.log(current, pageSize);
  }
  render() {
    const columns = [{
      title: '商品名',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'this is a  super big baka',
      className: 'pass',
      dataIndex: 'pass',
      render:text=><div>
      <Mybutton>重命名</Mybutton>
      <Mybutton>查看其分类</Mybutton>
      </div>
    }, ];
    
    const data = [{
      key: '1',
      name: 'AAAAAAA',
      // address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'BBBBBBB',
      // address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'CCCCCCC',
      // address: 'Sidney No. 1 Lake Park',
    },
  ];
    
    return (
      <div>
        <Card
          title="一级分类列表"
          extra={<Button type='primary' className='buttonMy'>+ 添加品类</Button> }
          className='CardTop'
        >
      <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,
            showQuickJumper: true,
          }}
        />,

        </Card>
       </div>
    )
  }
     
}