import React, { Component } from 'react'
import {
  Form, Icon, Input, Button,
} from 'antd';
import logo from './logo.png'
import './style.less'
const Item = Form.Item;

@Form.create()
class Login extends Component {
  login = (e) => {
    e.preventDefault();
  }
  validator = (rules, value, callback) => {
    // console.log(value,rules);
    const length = value && value.length;
    const Reg = /^[a-zA-Z0-9_]+$/;
    if (!value) {
      callback('必须输入密码')
    } else if (length < 4) {
      callback('密码必须大于4位')
    } else if (length > 16) {
      callback('密码必须小于16位')
    } else if (!Reg.test(value)) {
      callback('密码必须是英文.数字，或下划线组成')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="wrap">
        <header className="login-header">
          <img src={ logo } alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h3>用户登录</h3>
          <Form onSubmit={ this.login } className="login-form">
            <Item>
              {
                //getFieldDecorator是一个方法，这个方法接收两个参数，第一个是表单的字段对象，第二个是验证规则。这个方法本身返回一个方法，需要将需要获取值的标签包裹进
                getFieldDecorator(
                  'username',
                  {
                    rules: [{ required: true, whitespace: true, message: '必须输入用户名' },
                    { min: 4, message: '用户名必须大于4位' },
                    { max: 12, message: '用户名必须小于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' }
                    ],
                  }

                )(<Input prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> } placeholder="用户名" />)
              }

            </Item>

            <Item>
              {
                getFieldDecorator(
                  'password',
                  { rules:
                     [{ validator: this.validator }]
                     }
                )(
                  <Input prefix={ <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } /> } type="password" placeholder="密码" />
                )
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Login