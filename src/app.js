import React, { Component } from 'react'
import Admin from './pages/admin/admin'
import Login from './pages/login/login';
import {BrowserRouter, Switch, Route,Redirect} from 'react-router-dom'
export default class app extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
         <Route path='/admin' component={Admin}/>
         <Route path='/'  component={Login}/>
         <Redirect path='/'></Redirect>
        </Switch>
        </BrowserRouter>
      
    )
  }
}
