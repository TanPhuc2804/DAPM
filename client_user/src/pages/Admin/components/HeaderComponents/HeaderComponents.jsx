import { Col } from "antd";
import React from "react";
import { WrapperHeader, WrapperHeaderAccount, WrapperText1Header, WrapperTextHeader } from "./style";
import Search from "antd/es/transfer/search";
import {BellOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
const HeaderComponent = () => {
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
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <UserOutlined style={{ fontSize: '25px' }} />
                <span>Tài khoản</span>
            </div>
        </WrapperHeaderAccount>          
        </Col>
      </WrapperHeader>
      </div>
    )
}
export default HeaderComponent