import { Typography } from 'antd'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBell } from '@fortawesome/free-solid-svg-icons'
import ImageUser from '../ImageUser/ImageUser'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext, useAuth } from '../../../../assets/hooks/auth.context'
import { openNotification } from '../../../../assets/hooks/notification'
const baseURL ="http://localhost:5001/admin"
function HeaderAdmin() {
    const {auth,setAuth} = useContext(AuthContext)
    const {user} = auth
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get("http://localhost:3000/auth/logout")
            .then(res => res.data)
            .then(data => {
                setAuth({
                    isAuthenticated: false,
                    user: {
                        id: '',
                        name: '',
                        email: ''
                    }
                });
                openNotification(true, "Đăng xuất thành công", "")
                navigate('/');
            })
            .catch(err => console.log(err));
    }
    const handleNavigate = ()=>{
        
        navigate("account")
    }
    return (
        <div
            className='flex justify-between items-center m-auto w-auto px-6'
        >
            <Typography.Title level={2} className='my-4'>FMen Fashion</Typography.Title>
            <div className='flex items-center justify-between w-[150px] mr-[20px] hover:cursor-pointer'>
                <FontAwesomeIcon icon={faBell} size='lg' className='w-[20px] h-[20px] hover:cursor-pointer' />
                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                        <ImageUser
                            size={48}
                            urlImage={user?.img}
                            handleClick = {handleNavigate}
                        />

                    </div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='w-[20px] h-[20px] hover:cursor-pointer' onClick={handleLogout} />
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin