import React, { Component } from 'react';
import { Fragment } from 'react'
import Mybutton from '../my-button/button'
import { Link } from "react-router-dom";
import { Card, Button, Icon, Table, Select, Input, message } from 'antd'
import { GETproductItem, GetsearchIitm } from '../../../api/index'
const Option = Select.Option

export default class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      total: '',
      searchType: 'productName',
      pageNum: 1,
      pageSize: 3

    }
    this.SelectContentRef = React.createRef()
  }



  getProduct = async (pageNum, pageSize = 3) => {
    const searchType = this.state.searchType
    const searchContent = this.searchContent
    let result = null
    // console.log(searchType, searchContent);

    // console.log(searchType, searchContent);
    if (searchContent) {
        result = await GetsearchIitm({
        [searchType]: searchContent,
        pageNum,
        pageSize
      })
    } else {
      result = await GETproductItem(pageNum, pageSize)
    }

    if (result.status === 0) {
      // console.log(result);

      this.setState({
        dataSource: result.data.list,
        total: result.data.total,
        pageNum,
        pageSize
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
      key: 'CZ',
      render: (value) => {
        // console.log(value)
        return <Fragment>
         <Link to='/product/Detail'> <Mybutton>详情</Mybutton></Link>
          <Mybutton onClick={ this.onModify(value) }>修改</Mybutton>
        </Fragment>
      }
    }
  ];

  onModify = (value) => {
    return () => {
      this.props.history.push('/product/SaveUpdata', value)
    }
  }

  handleSelectname = (type) => {
    this.setState({
      searchType: type
    })
  }

  INcontent = async () => {
    this.searchContent = this.SelectContentRef.current.state.value
    this.getProduct(1)
  }



  render() {
    const { dataSource, total } = this.state
    // console.log(dataSource);

    return (
      <Card
        title={
          <Fragment>
            <Select defaultValue='productname' onChange={ this.handleSelectname }>
              <Option key={ 0 } value='productname' >根据商品名称</Option>
              <Option key={ 1 } value='productDesc' >根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={ { width: 200, margin: '0 10px' } } ref={ this.SelectContentRef } />
            <Button type="primary" onClick={ this.INcontent }>搜索</Button>
          </Fragment>
        }
        extra={ <Link to='/product/SaveUpdata'><Button type='primary'><Icon type='plus'></Icon> 添加产品 </Button> </Link> }

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
            onChange: this.getProduct,
            onShowSizeChange: this.getProduct,
            total
          } }
          rowKey='_id'
        />,

    </Card>


    )
  }
}