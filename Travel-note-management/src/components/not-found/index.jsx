import React from "react"
import { Button } from "antd-mobile"
import {useNavigate} from 'react-router-dom'

export default function NotFound() {
    const navigate=useNavigate()
    return (
        <div>
            <div>
                <h2>抱歉，找不到该页面!</h2>
                <Button
                    type="primary"
                    onClick={() =>navigate("/login")}
                >
                    回到首页
                </Button>
            </div>
        </div>
    )
}
