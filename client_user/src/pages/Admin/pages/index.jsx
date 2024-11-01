import React from 'react'
import SideBar from '../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import HeaderComponent from '../components/HeaderComponents/HeaderComponents'
import './style.css'
function Admin() {
    return (
        <div>
            <header className="header-cus">
                <HeaderComponent />
            </header>
            <div className="main-cus">
                <aside className="sidebar-cus">
                    <SideBar />
                </aside>
                <div className="content-cus">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default Admin