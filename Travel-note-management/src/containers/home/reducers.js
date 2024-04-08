import {combineReducers} from "redux"

import {
  GETALLDATA,
}from "./actionTypes"

const initNote={
  _id: "",
  title: "",
  image: [],
  content: "",
  count: 0,
  commentnum: 0,
  views: 0,
  is_approved: 0,
  user_id: ""
}

function note(state=initNote,action){
  switch(action.type){
    case GETALLDATA:
      const {_id,title,image,content,count,commentnum,views,is_approved,user_id}=action.data
      return {...state,_id,title,image,content,count,commentnum,views,is_approved,user_id}
    default:
      return state
  }
}