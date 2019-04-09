import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'

import Index from './index'
import SaveUpdata from './save-updata'
import Detail from './Detail'
export default class ProductMenu extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product/Index' component={Index}/>
        <Route path='/product/SaveUpdata' component={SaveUpdata}/>
        <Route path='/product/Detail' component={Detail}/>
        <Redirect to='/product/Index'/>
      </Switch>
    )
  }
}
