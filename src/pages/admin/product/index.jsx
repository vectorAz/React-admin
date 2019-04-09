import React, { Component } from 'react';
import { Fragment } from 'react'
import Mybutton from '../my-button/button'
import {  Link} from "react-router-dom";
import { Card, Button, Icon, Table, Select, Input, message } from 'antd'
import { GETproductItem } from '../../../api/index'
const Option = Select.Option

export default class Product extends Component {
  state = {
    dataSource: [],
    total:''
  }

  getProduct = async (pageNum, pageSize = 3) => {
    const result = await GETproductItem(pageNum, pageSize)
    if (result.status === 0) {
      this.setState({
        dataSource: result.data.list,
        total:result.data.total
      })
    } else {
      message.error('请求失败')
    }
  }
  
  componentDidMount() {
    this.getProduct(1)
  }



  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '状态',
      // dataIndex: 'address',
      key: 'ZT',
      render: () => {
        return <Fragment>
          <Button type="primary">下架</Button>
          &nbsp; &nbsp;在售
        </Fragment>
      }
    },
    {
      title: '操作',
      // dataIndex: 'address',
      key: 'CZ',
      render: () => {
        return <Fragment>
          <Mybutton>详情</Mybutton>
          <Mybutton>修改</Mybutton>
        </Fragment>
      }
    }
  ];
 

  render() {
    const { dataSource,total } = this.state
    // console.log(dataSource);
    
    return (
      <Card
        title={
          <Fragment>
            <Select value={ 0 }>
              <Option key={ 0 } value={ 0 }>根据商品名称</Option>
              <Option key={ 1 } value={ 1 }>根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={ { width: 200, margin: '0 10px' } } />
            <Button type="primary">搜索</Button>
          </Fragment>
        }
        extra={ <Link to='/product/SaveUpdata'><Button type='primary'><Icon type='plus'></Icon> 添加产品 </Button> </Link>   }

      >
        <Table
          columns={ this.columns }
          dataSource={ dataSource }
          bordered
          pagination={ {
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,
            showQuickJumper: true,
            onChange:this.getProduct,
            onShowSizeChange:this.getProduct,
            total
          } }
          rowKey='_id'
        />,

    </Card>


    )
  }
}