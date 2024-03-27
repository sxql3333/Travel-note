import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESEIVE_USER,
    RESET_USER,
    // RECIVE_USER_LIST,
    // RECIVE_MSG_LIST,
    // RECIVE_MSG,
} from './action-types'
import {
    reqRegister,
    reqLogin,
} from "../api"
import io from "socket.io-client";
import store from "./store"


const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errMsg = (msg) => ({ type: ERROR_MSG, data: msg })
const reseive = (user) => ({ type: RESEIVE_USER, data: user })
const reset = (msg) => ({ type: RESET_USER, data: msg })
const reciveUserList = (data) => ({ type: RECIVE_USER_LIST, data })
const reciveMsgList=(data)=>({type:RECIVE_MSG_LIST,data})
const reciveMsg=(chatMsg)=>({type:RECIVE_MSG,data:chatMsg})



const initIO = (userid) => {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', function ({chatMsg}) {
            if(chatMsg.from===userid || chatMsg.to===userid){
                store.dispatch(reciveMsg(chatMsg,userid))
            }
        })
    }
}

export const sendMsg = ({ from, to, content }) => {
    if (content) {
        io.socket.emit('sendMsg', { from, to, content })
    }
}


export const getMgLsit=async (userid)=>{
    initIO(userid)
    const response=await reqChatMsgList()
    const result=response.data
    if(result.code===0){
        store.dispatch(reciveMsgList(result.data))
    }
}

//登录action
export const login = (user) => {
    const { username, password } = user
    if (!username) {
        store.dispatch((errMsg("用户名不能为空")))
        return
    }
    else if (!password) {
        store.dispatch((errMsg("密码不能为空")))
        return
    }
    return (() => {
        reqLogin({ username, password }).then(data => {
            const result = data.data
            if (result.code === 0) {//成功
                getMgLsit(result.data._id)
                store.dispatch(authSuccess(result.data))
            }
            else {//失败
                store.dispatch(errMsg(result.msg))
            }
        })
    })()
}

//注册action
export const register = (user) => {
    const { username, password, password2, type } = user
    if (!username) {
        store.dispatch(errMsg("用户名不能为空"))
        return
    }
    else if (password !== password2) {
        store.dispatch(errMsg("两次密码要一致"))
        return
    }
    return (() => {
        reqRegister({ username, password, type }).then((data) => {
            const result = data.data
            if (result.code === 0) {//成功
                getMgLsit(result.data._id)
                store.dispatch((authSuccess(result.data)))
            }
            else {//失败
                store.dispatch((errMsg(result.msg)))
            }
        })
    })()
}

//更新用户数据action
export const update = (user) => {
    reqUpDataUser(user).then((response) => {
        const result = response.data
        if (result.code === 0) {
            store.dispatch(reseive(result.data))
        }
        else {
            store.dispatch(reset(result.msg))
        }
    })
}

//获取用户数据
export const getUser = () => {
    reqGetUser().then((response => {
        const result = response.data
        if (result.code === 0) {
            getMgLsit(result.data._id)
            store.dispatch(reseive(result.data))
        }
        else {
            store.dispatch(reset(result.msg))
        }
    }))
}

//重置redux
export const resetUser = () => {
    store.dispatch(reset())
}

//获取用户列表
export const getUserList = (type) => {
    reqUserList(type).then((response) => {
        const result = response.data
        if (result.code === 0) {
            store.dispatch(reciveUserList(result.data))
        }
    })
}
