import React from 'react';
import dayjs from 'dayjs';
import {Button } from 'antd';
import { useDispatch } from 'react-redux';
import { selectVoucher } from '../../../../../pages/Admin/redux/Voucher/voucherSlice';
const VoucherCard = ({ voucher, isSelected }) => {
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(selectVoucher(voucher))
    }
    return (
        <div className="max-w-sm p-6 bg-white border-l-4 border-green-500 shadow-md rounded-lg relative overflow-hidden">
            <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-2 py-1 rounded uppercase">
                {voucher.status}
            </span>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Voucher Name: {voucher.nameVoucher}
            </h2>
            <div className="text-4xl font-bold text-green-500 mb-2">
                {voucher.discount}% OFF
            </div>
            <p className="text-gray-600 text-sm">
                Expiry Date: {dayjs(voucher.expiryDate).format('YYYY-MM-DD')}
            </p>
            <Button
                className={`mt-4 px-4 py-2 rounded text-white ${isSelected ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                onClick={handleClick}
            >
                {isSelected ? 'Selected' : 'Select'}
            </Button>
        </div>

    );
};

export default VoucherCard;
