import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import VoucherCard from './VoucherCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { selectVoucher } from '../../../../../pages/Admin/redux/Voucher/voucherSlice'
function ModalVouchers({ visible, close }) {
    const [vouchers, setVouchers] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get("http://localhost:3000/Voucher/get-allvoucher")
            .then(res => res.data)
            .then(data => {
                setVouchers(data.vouchers)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const handleClose = () => {
        dispatch(selectVoucher({}))
        close()
    }
    return (
        <Modal
            cancelText="Trở lại"
            title={<p className='text-[20px] font-bold'>Mã khuyến mãi của cửa hàng có</p>}
            open={visible}
            onOk={close}
            onCancel={handleClose}
        >
            <div className='d-flex justify-center items-center'>
                {vouchers.length > 0 &&
                    vouchers.map((item) => {
                        if (item.quantity > 0) {
                            return (
                                <div key={item._id} className='m-[20px]'>
                                    <VoucherCard voucher={item} ></VoucherCard>
                                </div>
                            )
                        }
                    })
                }
            </div>

        </Modal>
    )
}

export default ModalVouchers