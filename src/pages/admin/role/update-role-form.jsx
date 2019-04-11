import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';
import menuList from '../../../api/goods'
import PropTypes from 'prop-types'

const Item = Form.Item;
const { TreeNode } = Tree;

@Form.create()
class UpdateRoleForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired,
    upuserdate: PropTypes.func.isRequired
  }
  state = {
    autoExpandParent: true,
  }

  onExpand = (expandedKeys) => {
    this.setState({
      autoExpandParent: false,
    });
  }
  onCheckeys = (onCheckey) => {
    console.log(onCheckey);
    this.props.upuserdate(onCheckey)
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={ item.title } key={ item.key } dataRef={ item }>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode { ...item } />;
  })

  render() {
    const { role: { name, menus } } = this.props

    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: ''
              }
            )(
              <Input placeholder={ name } disabled />
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            onExpand={ this.onExpand }
            defaultExpandAll
            onCheck={ this.onCheckeys }
            checkedKeys={ menus }
          >
            { <TreeNode title={ '平台权限' } key='-1'>
              { this.renderTreeNodes(menuList) }
            </TreeNode> }
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default UpdateRoleForm