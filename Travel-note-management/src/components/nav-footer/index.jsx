import React from 'react'
import { TabBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import './index.css'



export default function NavFooter(props) {
    const { navList } = props
    const newNav = navList.filter(item => !item.hide)
    const navigate = useNavigate()
    const total=useSelector(state=>state.chat.unReadMsg)
    const change = (e) => {
        navigate(e)
    }
    return (
        <div className={'footnav'}>
            <TabBar safeArea={true} onChange={(e) => change(e)}>
                {newNav.map((item) => {
                    return <TabBar.Item
                        key={item.path}
                        icon={item.antdicon}
                        title={item.text}
                        badge={item.path==='/message'?(total?total:null):null}
                    />
                }
                )}
            </TabBar>
        </div>

    )
}
