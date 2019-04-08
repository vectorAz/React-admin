import React, { Component } from 'react';
import { Card,Button,Table,Modal, message   } from 'antd';
import './index.less'
import  {getitem,addcreatItem} from '../../../api/index'
import Mybutton from '../my-button/button'
import AdditemCard from './additemCard'
export default class Category extends Component {
  constructor(props){
    super(props)
    this.state={
      categories:[],//一级分类数据
      isShow:false
    }
    this.createAddForm = React.createRef();
  }
  addItem=()=>{
    console.log(this.createAddForm.current);

    const {validateFields}=this.createAddForm.current.props.form;
    
    validateFields(async (err,values)=>{
      // console.log(err,values);
      if(!err){
        const {parentId,categoryName}=values
        const resule= await addcreatItem(parentId,categoryName)
        console.log(parentId,categoryName);
        
        console.log(resule);
        
        if(resule.status===0){
          this.setState({
            isShow:false
          })
          message.success('添加分类成功')
        }else{
          message.error('添加失败')

        }

      }else{

      }

    })
  }


  getCategories=async (parentId)=>{
    const result=await getitem(parentId)

    if(result.status===0){

      this.setState({
        categories:result.data
      })
    }
  }

  componentDidMount() {
    this.getCategories('0')
  }

  addItemCard=()=>{
    this.setState({
      isShow:true
    })
  }


  render() {
    const {categories}=this.state
    // console.log(categories);
    
    const columns = [{
      title: '商品名',
      dataIndex: 'name',
      render: text => <a href="/">{text}</a>,
    }, {
      title: 'this is a  super big baka',
      className: 'pass',
      dataIndex: 'pass',
      render:text=><div>
      <Mybutton name='222'>重命名</Mybutton>
      <Mybutton>查看其分类</Mybutton>
      </div>
    }, ];
    return (

      <div>
        <Card
          title="一级分类列表"
          extra={<Button type='primary' className='buttonMy' onClick={this.addItemCard}>+ 添加品类</Button> }
          className='CardTop'
        >
      <Table
          columns={columns}
          dataSource={categories}
          bordered
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3,
            showQuickJumper: true,
          }}
          rowKey='_id'
        />,
        <Modal
          title="请输入标签名"
          visible={this.state.isShow}
          okText='确认'
          cancelText='取消'
          onOk={this.addItem}
          onCancel={()=>{this.setState({isShow:false})}}
        >
        <AdditemCard  categories={categories} wrappedComponentRef={this.createAddForm}/>

        </Modal>
        </Card>
       </div>
    )
  }
     
}