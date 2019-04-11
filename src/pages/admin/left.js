import React, { Component, Fragment } from 'react'
import { Menu, Icon, } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import menuList from '../../api/goods'
import logo from './logo.png'
import { getstorage } from '../../ITPCA/storage';
const SubMenu = Menu.SubMenu;
@withRouter
class Left extends Component {
    static propTypes = {
        opacity: PropTypes.number.isRequired
    }
    constructor(props) {
        super(props)
        const openKeys = []
        const menus=this.getmenu(menuList)
        this.Menu = this.createmenu(menus, openKeys)
        
        this.state = {
            openKeys
        }
        console.log(this.Menu);

    }

    createitem(item) {
        return <Menu.Item key={ item.key }>
            <Link to={ item.key }>
                <Icon type={ item.icon } />
                <span>{ item.title } </span>
            </Link>
        </Menu.Item>

    }

    createmenu(menuList, openKeys) {
        const { pathname } = this.props.location
        return menuList.map((item) => {
            if (item.children) {
                return (
                    <SubMenu key={ item.key } title={ <span> <Icon type={ item.icon } /><span>{ item.title }</span></span> }>
                        {
                            //    this.createmenu(item.children)
                            item.children.map((index) => {
                                if (pathname.startsWith(index.key)||index.key.startsWith(pathname)) {
                                    openKeys.push(item.key)
                                }
                                return this.createitem(index)
                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    this.createitem(item)
                )
            }
        })
    }

    // getMenu (menuList) {
    //     const { menus } = memory.user.role
    //     //一级分类遍历
    //     //假装克隆 这里会影响role
    //     const arr = menuList.slice()
    //     return arr.reduce((prev, curr) => {
    //       let children = curr.children
    //       if (menus.includes(curr.key)) return [...prev, curr]
    //       //可能children有标签没有添加
    //       else if (children) {
    //         curr.children = children.filter((item) => menus.includes(item.key))
    //         return curr.children.length ? [...prev, curr] : prev
    //       }
    //       else return prev
    //     }, [])
    //   }

    getmenu(menuList) {
        const menus = getstorage().role.menus
        console.log(menus);
        
         return  menuList.reduce((previous, current) => {
            const ismenus = menus.find((item) => {
                return item === current.key
            })
            if (ismenus) {
                const children = current.children

                if (menus.includes(current.key)) return [...previous, current]
                  else if (children) {
                    children.filter((item) => {
                        return menus.find((index) => {
                            return index === item.key
                        })
                    })
                }
                return [...previous, current]
            } else {
                return previous
            }
        }, [])
        
    }



    handleOpenChange = (openKeys) => {
        // console.log(openKeys);
        this.setState({ openKeys })
    }
    handleClick = () => {
        this.setState({ openKeys: [] })
    }
    render() {

        let { location: { pathname }, opacity } = this.props
        // console.log(pathname);
        // console.log(this.state.openKeys);
        // console.log(pathname);
        if (pathname.startsWith('/product')) {
            pathname = '/product'
        }


        return (
            <Fragment>
                <Link to='/home' className='logo' onClick={ this.handleClick }>
                    <img src={ logo } alt="111" />
                    <h1 style={ { opacity } } >明日方舟</h1>
                </Link>
                <Menu theme="dark" selectedKeys={ [pathname] } mode="inline" openKeys={ this.state.openKeys } onOpenChange={ this.handleOpenChange } >
                    {
                        this.Menu
                    }
                </Menu>
            </Fragment>
        )
    }
}
export default Left