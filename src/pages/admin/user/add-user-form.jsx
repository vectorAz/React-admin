import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types'

const Item = Form.Item;
const Option = Select.Option;


@Form.create()
class AddUserForm extends Component {
  static propTypes={
    user:PropTypes.array.isRequired
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    const {user} =this.props
    
    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'name'
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password'
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone'
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email'
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'role_id'
            )(
              <Select placeholder='请选择分类'>
               {
                 user.map((item)=>{
                 return <Option key={item._id}>{item.name}</Option>
                 })
               }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddUserForm;