import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { AppstoreOutline, MessageFill, TeamFill } from 'antd-mobile-icons'
import NavFooter from '../../components/nav-footer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import store from '../../redux/store'
import login from '../login'
import register from '../register'
import { Link } from 'react-router-dom';

export default function Home() {
  // const location = useLocation()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   let { user } = store.getState()
  //   if (!users) {
  //     navigate('/login')
  //   }
  // }, [location.pathname, navigate])

  // let navList = [
  //   {
  //     path: '/login', // 路由路径
  //     component: login,
  //     title: '登录',
  //     icon: 'login',
  //     text: '登录',
  //     antdicon: <MessageFill />
  //   },
  //   {
  //     path: '/register', // 路由路径
  //     component: register,
  //     title: '注册',
  //     icon: 'register',
  //     text: '注册',
  //     antdicon: <TeamFill />
  //   }
    
  // ]
  // let { user } = store.getState()
  // let path = location.pathname

  // const navabar = navList.find(obj => obj.path === path)
  // const currentNav = navList.find(obj => obj.path === path)
  // const { type } = user
  // const addNewNote = () => {
  //   store.dispatch({type:'ADD_NOTE'})
  // }
  return (
    // <>
    //   {navabar ? <NavBar back={null} className="navbar">{navabar.title}</NavBar> : null}
    //   <Routes>
    //     <Route path="/login" element={<login />}></Route>
    //   </Routes>
    //   {navabar ? <NavFooter navList={navList}>底部组件</NavFooter> : null}
    // </>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button type="primary" style={{ marginRight: '10px' }}>
      <Link to="/login">登录</Link>
    </Button>
    <Button>
      <Link to="/register">注册</Link>
    </Button>
    <Button type="primary" style={{ marginLeft: '10px' }} >新建</Button>
  </div>

  )

}