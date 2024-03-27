import {combineReducers} from "redux"
import {GetRedirect} from '../utils'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESEIVE_USER,
    RESET_USER,
    RECIVE_USER_LIST,
    RECIVE_MSG,
    RECIVE_MSG_LIST,
} from "./action-types"

const initUser={
    username:"",
    type:"",
    msg:"",
    redirect:''
}

function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:
            const {type,header}=action.data
            return {...state,...action.data,redirect:GetRedirect(type,header)}
        // case ERROR_MSG:
        //     return {...state,msg:action.data}
        case RESEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }
}


const initUserList=[]
function userList(state=initUserList,action){
    switch(action.type){
        case RECIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}


const initChat={
    users:{},
    chatMsg:[],
    unReadMsg:0
}
function chat(state=initChat,action){
    switch (action.type){
        case RECIVE_MSG_LIST:
            const {users,chatMsg}=action.data
            return {
                users,
                chatMsg,
                unReadMsg:0
            }
        case RECIVE_MSG:
            return {
                users:state.users,
                chatMsg:[...state.chatMsg,action.data],
                unReadMsg:0
            }
        default:
            return state
    }

}

export default combineReducers({
    user,
    userList,
    chat
})