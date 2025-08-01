import { Col, Row, Space, Typography } from 'antd'
import React from 'react'
import { EllipsisOutlined, RiseOutlined, TransactionOutlined } from '@ant-design/icons'
function CardRevenue({title,icon,content,increase,color}) {
    
    return (
        <Col span={20} className='bg-[#001529]  width-[100px] h-[180px] mx-auto border-1 rounded-[20px] border-[#1890ff] mb-4'>
            <Row gutter={[16, 16]} className='text-white items-center justify-between p-4'>
                <Col span={18} className='text-start font-bold text-[20px] text-white'>{title} </Col>
                <Col >
                    <EllipsisOutlined style={{ fontSize: "40px", fontWeight: "bold" }} />
                </Col>
            </Row>
            <Row className='text-white items-center justify-between px-4'>
                {icon}
                <Typography.Text style={{ textAlign: "start", fontSize: "30px", fontWeight: "bold", color: "white" }}> {content}</Typography.Text>
            </Row>
            <Row className='text-white items-center justify-between p-4'>
                <Col>
                    <RiseOutlined style={{ fontSize: "15px" , marginRight:"5px",color:color}} />
                    {/* <Typography.Text style={{ textAlign: "start", fontSize: "15px", color: color}}> Tăng {increase}% </Typography.Text>
                    <Typography.Text style={{ textAlign: "start", fontSize: "15px", color: "white" }}>  so với tuần trước </Typography.Text>
                    */}
                </Col>
            </Row>
        </Col>
    )
}

export default CardRevenue