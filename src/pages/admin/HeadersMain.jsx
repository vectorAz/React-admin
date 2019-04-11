import React, { Component } from 'react'
import { Row, Col, Modal,message } from 'antd';
import { withRouter } from 'react-router-dom'
import './Header.less'
import Button from './my-button/button'
import dayjs from 'dayjs';
import { reqWeather } from '../../api/index'
import menuList from '../../api/goods'
import userid from '../../ITPCA/user'
import { remStorage } from '../../ITPCA/storage'
@withRouter
class HeadersMain extends Component {

  state = {
    sysTime: dayjs().format('YYY-MM-DD HH:mm:ss'),
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather: '晴',

  }

  gettitle = () => {
    const { pathname } = this.props.location
    for (var i = 0, index = menuList.length; i < index; i++) {
      const children = menuList[i].children
      if (children) {
        for (let j = 0; j < children.length; j++) {

          if ( pathname.startsWith(children[j].key)) {
            return children[j].title
          }
        }
      } else {
        if (pathname === menuList[i].key) {
          return menuList[i].title
        }
      }

    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    }, 1000)
    reqWeather('深圳')
      .then((value) => {
        this.setState({
          weatherImg: value.weatherImg,
          weather: value.weather
        })

      })
      .catch((err) => {
        console.log(err, '请求失败');
      message.error(err, 2)
      })
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onClick = () => {
    Modal.confirm({
      title: '您确定要退出登录嘛？',
      onOk: () => {
        userid.id = {}
        this.props.history.push('/login')
        remStorage();      
},
      okText: '确定',
      cancelText: '取消'
    })
  }

  render() {
    const title = this.gettitle()
    // console.log(userid.id);

    const {username} = userid.id
    
    const { sysTime, weatherImg, weather } = this.state
    return (
      <div className='header-main'>
        <Row className='header-top'>
          <span>欢迎 { username }</span>
          
          <Button onClick={ this.onClick } >退出</Button>
        </Row>
        <Row className='header-bottom'>
          <Col className='leftCol' span={ 6 }>{ title }</Col>
          <Col className='rightCol' span={ 18 }>
            <span>{ sysTime }</span>
            <img src={ weatherImg } alt="天气" />
            <span>{ weather }</span>
          </Col>
        </Row >
      </div>
    )
  }
}
export default HeadersMain