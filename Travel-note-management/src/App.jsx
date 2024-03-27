import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./containers/login"
import Home from "./containers/home"
import Register from "./containers/register"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/*" element={<Home />}></Route>
      </Routes>
    </Router>
  )
}
