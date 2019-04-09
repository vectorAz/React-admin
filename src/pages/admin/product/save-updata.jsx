import React, { Component } from 'react'
import { Card, Button, Icon, Form, Input, Cascader, InputNumber ,message} from 'antd'
import './save-updata.less'
import { getitem ,SETgoods} from '../../../api/index'
import Richtext from './rich-text-editor'
const Item = Form.Item

@Form.create()
class Saveupdata extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
    this.RichtextRef = React.createRef()
  }


  goBack = () => {
    this.props.history.goBack();
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    // 调整Item的内容占据多少列
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  }
  onChange = (value) => {
    // console.log(value);
  }
  //获取二级分类
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // console.log(selectedOptions);
    this.getCategories(targetOption.value)
  }

  //获取 一级分类
  getCategories = async (parentId) => {
    const result = await getitem(parentId)
    if (result.status === 0) {

      if (parentId === '0') {
        this.setState({
          options: result.data.map((item) => {
            return {
              value: item._id,
              label: item.name,
              isLeaf: false,
            }
          })
        })
      } else {
        const { options } = this.state

        this.setState({

          options: options.map((item) => {
            if (item.value === parentId) {
              item.children = result.data.map((index) => {
                return {
                  value: index._id,
                  label: index.name,
                }
              })
              item.loading = false;
              item.isLeaf = true;
            }
            return item
          })
        })
      }
    }

  }

  componentDidMount() {
    this.getCategories('0')
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log(values);

        const {category,desc,name,price}=values
        const detail=this.RichtextRef.current.state.editorState.toHTML()

        let pCategoryId,categoryId;
        if(category.length===1){
          pCategoryId='0'
          categoryId=category[0]
      
        }else{
          pCategoryId=category[0]
          categoryId=category[1]
        }
        const result =await SETgoods({name,desc,price,pCategoryId,categoryId,detail})
        // console.log(result);
        if(result.status===0){
          message.success('商品添加成功')
          this.props.history.goBack()
        }else{
          message.error('商品添加失败')
        }

      }
    })
  }


  render() {
    const { options } = this.state
    const { getFieldDecorator } = this.props.form;

    return (
      <Card
        title={
          <div className='arrow-fater'>
            <Icon onClick={ this.goBack } className='updata-arrow' type='arrow-left' />
            <span> &nbsp; &nbsp;添加商品</span>
          </div>
        }
      >
        <Form { ...this.formItemLayout } onSubmit={ this.onSubmit }>
          <Item label='商品名称'>
            {
              getFieldDecorator(
                'name',
                {
                  rules: [{ required: true, whiteSpace: true, message: '商品名称不能为空' }]
                }
              )(
                <Input placeholder='请输入商品名称'></Input>

              )
            }
          </Item>

          <Item label='商品描述'>
            {
              getFieldDecorator(
                'desc',
                {
                  rules: [{ required: true, whiteSpace: true, message: '商品描述不能为空' }]
                }
              )(
                <Input placeholder='请输入商品描述'></Input>

              )
            }
          </Item>

          <Item label='商品分类'
            wrapperCol={ {
              xs: { span: 24 },
              sm: { span: 3 },
            } }>

            {
              getFieldDecorator(
                'category',
                {
                  rules: [{ required: true, message: '商品分类不能为空' }]
                }
              )(
                <Cascader
                  size="large"
                  options={ options }
                  onChange={ this.onChange }
                  changeOnSelect
                  loadData={ this.loadData }
                />
              )
            }
          </Item>

          <Item label='商品价格'>
            {
              getFieldDecorator(
                'price',
                {
                  rules: [{ required: true, message: '商品价格不能为空' }]
                }
              )(
                <InputNumber
                  formatter={ value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                  parser={ value => value.replace(/¥\s?|(,*)/g, '') }
                  onChange={ this.onChange }
                />
              )
            }

          </Item>

          <Item label='商品详情' wrapperCol={ {
            xs: { span: 24 },
            sm: { span: 17 },
          } }>
            <Richtext ref={ this.RichtextRef } />
          </Item>

          <Item >
            <Button type='primary' className='subutton' htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card >
    )
  }
}
export default Saveupdata

/**
 *
 * options = [{
    value: 'zhejiang111',
    label: 'Zhejiang222',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }]
 */