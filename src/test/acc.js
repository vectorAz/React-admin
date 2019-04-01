import React, { Component } from 'react'
import hoc from './hoc';
@hoc('登录')
 class Noword extends Component {
    render(){
        const  {username,password,compostchange,noSubmit}=this.props;
        //不要在回调函数中写箭头函数  它每次都会重新创建新的函数 性能不好
        return <form action="/" onSubmit={noSubmit}>
            用户名:<input type="text" name="username"  value={username} onChange={compostchange('username')}/> <br/>
            密码: <input type="password" name="password" value={password} onChange={compostchange('password')}/> <br/>
             <input type="submit" value="登录" />
        </form>
    };
}
export default Noword