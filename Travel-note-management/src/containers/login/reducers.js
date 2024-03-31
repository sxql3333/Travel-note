import {combineReducers} from "redux"

import {
  LOGIN_SUCCESS,
}from "./actionTypes"

const initUser={
  username: "",
  password: "",
  auth:1
}

function user(state=initUser,action){
  switch(action.type){
    case LOGIN_SUCCESS:
      const {username,password,auth}=action.data
      return {...state,username,password,auth}
    default:
      return state
  }
}