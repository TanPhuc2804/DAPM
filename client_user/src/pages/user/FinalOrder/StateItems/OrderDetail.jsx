import React from 'react'
import { Col, Row, Image } from 'antd'
import { formatCurrency } from '../../../../assets/Function/formatCurrency'
function OrderDetail({ product }) {
    return (
        <Row className="m-[10px] text-left" justify="space-between">
            {/* Hình ảnh sản phẩm */}
            <Col span={4} className="mr-[10px] text-center">
                <Image src={product._idProduct.image[0]} width={130} height={130} />
            </Col>

            {/* Thông tin sản phẩm */}
            <Col span={10}>
                <Row>
                    <Col span={24} className="text-lg font-semibold"><b>Tên sản phẩm:</b> {product.name}</Col>
                    <Col span={24} className="text-base"><b>Giá tiền:</b> {formatCurrency(product.price)}</Col>
                    <Col span={24} className="text-base"><b>Size:</b> {product.size}</Col>

                </Row>
            </Col>

            {/* Số lượng sản phẩm */}
            <Col span={4} className="text-base">
                <b>Số lượng:</b> x{product.quantity}
            </Col>

            {/* Tổng tiền */}
            <Col span={4} className="text-base font-semibold text-green-600">
                <b>Tổng tiền:</b> {formatCurrency(product.quantity*product.price)}
            </Col>
        </Row>


    )
}

export default OrderDetail