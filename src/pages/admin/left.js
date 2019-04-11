import React, { Component, Fragment } from 'react'
import { Menu, Icon, } from 'antd';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import menuList from '../../api/goods'
import logo from './logo.png'
const SubMenu = Menu.SubMenu;
@withRouter
class Left extends Component {
    static propTypes = {
        opacity: PropTypes.number.isRequired
    }
    constructor(props) {
        super(props)
        const openKeys = []
        this.Menu = this.createmenu(menuList, openKeys)
        this.state = {
            openKeys
        }
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
        if(pathname.startsWith('/product')){
          pathname='/product'                                                                                           
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