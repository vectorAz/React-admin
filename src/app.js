import React, { Component } from 'react'
import Admin from './pages/admin/admin'
import Login from './pages/login/login';
import './reset/res.less'
import {BrowserRouter, Switch, Route,} from 'react-router-dom'
export default class app extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
         <Route path='/admin' component={Admin}/>
         <Route path='/login'  component={Login}/>
         {/* <Redirect to='/login' /> */}
        </Switch>
        </BrowserRouter>
      
    )
  }
}
