import {combineReducers} from "redux"

import {
  REGISTER_SUCCESS,
}from "./actionTypes"

const initResUser={
  username: "",
  password: "",
}

function user(state=initResUser,action){
  switch(action.type){
    case REGISTER_SUCCESS:
      const {username,password}=action.data
      return {...state,username,password}
    default:
      return state
  }
}