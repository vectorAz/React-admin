import React, { Component } from 'react'
import { Input, Form, Select } from 'antd';
import PropTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option;
@Form.create()
class AdditemCard extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
  }

  validator = (rule, value, callback) => {
    const { categories } = this.props;

    const category = categories.find((category) => category.name === value);

    if (!value) {
      callback('请输入要修改的分类名称，不能为空');
    } else if (category) {
      callback('不能与之前分类名称相同');
    } else {
      callback();
    }
  }
  render() {
    const { form: { getFieldDecorator }, categories } = this.props
    console.log(categories)

    return (

      <Form>
        <Item label="选择分类等级">
          {
            getFieldDecorator(
              'parentId',
              {
                initialValue: '0'
              }
            )(
              <Select style={ { width: 480 } } >
               <Option key="0" value="0">一级分类</Option>
              {
               categories.map((category)=>{
              return  <Option key={category._id} value={category._id}>{category.name}</Option>
               })

              }
                </Select>
            )
          }
        </Item>

        <Item label='分类名称'>
        {
           getFieldDecorator(
            'categoryName',
            {
              rules: [
                {validator: this.validator} //自定义表单校验
              ]
            }
          )(
            <Input placeholder="请输入品类名称" />,

          )
        }
        </Item>

      </Form>
    )
  }
}
export default AdditemCard