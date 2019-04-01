import React, { Component } from 'react'

export default function hoc(name){
        return (WrappedComponent)=>  class  extends Component {
            static displayName=`Form(${getName(WrappedComponent)})`

            state={
                username:'',
                password:'',
                repassword:''
            }
        
            compostchange=(name)=>{
                return (e)=> {
                    // this.change(name,e.target.value)}
                    this.setState({
                        [name]:e.target.value
                        //中括号表示变量
                    })
                }
            };
        
            noSubmit=(e)=>{
                e.preventDefault()
                const  {username,password,repassword}=this.state;
             if(repassword){
                alert(`用户名:${username},密码:${password} 确认密码：${repassword} `)
             }else if(!repassword){
                alert(`用户名:${username},密码:${password}`)
             }
            };

            render(){
                //不要在回调函数中写箭头函数  它每次都会重新创建新的函数 性能不好
                const func= {
                    compostchange:this.compostchange,
                    noSubmit:this.noSubmit
                }
                return <div>
                    <h2>{name}</h2>
                     <WrappedComponent {...func} {...this.state} />
                </div>
            };
        }
}
function getName(WrappedComponent){
    return WrappedComponent.displayName||WrappedComponent.name||'cComponent'
}