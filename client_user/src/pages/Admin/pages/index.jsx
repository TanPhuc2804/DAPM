import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '../components/HeaderComponents/HeaderComponents'
import './index.css'
function Admin() {
    return (
        <div>
            <header className="header">
                <HeaderComponent />
            </header>
            <div className="main">
                <aside className="sidebar">
                    <SideBar />
                </aside>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin