import { Col } from "antd";
import React,{useContext} from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../../../../assets/hooks/auth.context"
import { WrapperHeader, WrapperHeaderAccount, WrapperText1Header, WrapperTextHeader } from "./style";
import Search from "antd/es/transfer/search";
import {BellOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
const HeaderComponent = () => {
    const {auth} = useContext(AuthContext)
    return (
        <div >
        <WrapperHeader gutter={16}>
        <Col span={6}>
        <WrapperTextHeader>F<WrapperText1Header>M</WrapperText1Header>EN</WrapperTextHeader>
        </Col>
        <Col span={10}>
            <ButtonInputSearch
            size="large"
            bordered = "false"
            placeholder="input search text"
            textButton ="Tìm kiếm"
            allowClear
            //onSearch={onSearch}
            />
        </Col>
        <Col span={6} style={{display:"flex",justifyContent: "flex-end", paddingRight: '50px' }}>
        <WrapperHeaderAccount>
        <div>
            <BellOutlined style={{fontSize: '25px'}}/>
        </div>
            <Link to={"/admin/infor"} style={{ display: "flex", alignItems: "center", gap: "5px", color:"black"}}>
                <UserOutlined style={{ fontSize: '25px' }} />
                <span >{auth.isAuthenticated ?auth.user.name : "Tài khoản"}</span>
            </Link>
        </WrapperHeaderAccount>                                                                                                 
        </Col>
      </WrapperHeader>
      </div>
    )
}
export default HeaderComponent