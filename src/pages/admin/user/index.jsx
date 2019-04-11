import React, { Component, Fragment } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import MyButton from '../my-button/button';
import { Addusername, Getuserlist, Getusername } from '../../../api/index'
export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], //用户数组
      isShowAddUserModal: false, //是否展示创建用户的标识
      isShowUpdateUserModal: false, //是否展示更新用户的标识
      userlist: []
    }

    this.addUserForm = React.createRef();
    this.updateUserForm = React.createRef();
  }


  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: id => {
        const rule = (this.state.userlist.find((item) => {
          return item._id === id
        }))
        return rule && rule.name
      }
    },
    {
      title: '操作',
      render: user => {
        return <Fragment>
          <MyButton onClick={ () => { } }>修改</MyButton>
          <MyButton onClick={ () => { } }>删除</MyButton>
        </Fragment>
      }
    }
  ];

  changeModal = (name, value) => {
    return () => {
      this.setState({ [name]: value })
    }
  }
  componentDidMount() {
    this.getlist()

  }
  getlist = async () => {
    const user = await Getuserlist()

    if (user.status === 0) {
      this.setState({
        userlist: user.data
      })
      // console.log(this.state.userlist);

    }

    const listForuser = await Getusername()
    // console.log(listForuser);

    if (listForuser.status === 0) {

      this.setState({
        users: listForuser.data.users
      })
    }

  }


  //创建用户的回调函数
  handleAddUser = () => {
    const { validateFields, resetFields } = this.addUserForm.current
    validateFields(async (err, value) => {
      if (!err) {
        const { name, password, phone, email, role_id } = value
        // console.log(value);

        const username = name
        const result = await Addusername({
          username,
          password,
          phone,
          email,
          role_id
        })
        if (result.status === 0) {
          message.success('添加用户成功')
          resetFields()
          const listForuser = await Getusername()
          if (listForuser.status === 0) {
            this.setState({
              users:  listForuser.data.users
            })
          }

          this.setState({
            isShowAddUserModal: false
          })
        } else {
          message.error(result.msg)
        }


      }
    })
  }

  handleUpdateUser = () => { }

  render() {
    const { users, isShowAddUserModal, isShowUpdateUserModal } = this.state;

    return (
      <Card
        title={
          <Button type='primary' onClick={ this.changeModal('isShowAddUserModal', true) }>创建用户</Button>
        }
      >
        <Table
          columns={ this.columns }
          dataSource={ users }
          bordered
          rowKey='_id'
          pagination={ {
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          } }
        />

        <Modal
          title="创建用户"
          visible={ isShowAddUserModal }
          onOk={ this.handleAddUser }
          onCancel={ this.changeModal('isShowAddUserModal', false) }
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm ref={ this.addUserForm } user={ this.state.userlist } />
        </Modal>

        <Modal
          title="更新用户"
          visible={ isShowUpdateUserModal }
          onOk={ this.handleUpdateUser }
          onCancel={ this.changeModal('isShowUpdateUserModal', false) }
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm ref={ this.updateUserForm } />
        </Modal>

      </Card>
    )
  }
}
