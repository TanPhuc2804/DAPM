import React from 'react'
import { Button, ConfigProvider } from 'antd'
import Modal from 'antd/es/modal/Modal'
import FormOrderDetail from '../FormOrder/FormOrderDetail'
function ModalOrder({ open, closeModal, order }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize:18
        },
      }}
    >
      <Modal
        width={700}
        open={open}
        onCancel={closeModal}
        footer={<></>}

      >
        <div>
          <h2 className='text-black text-[24px] font-bold text-center my-[10px]'>Chi tiết đơn hàng</h2>
        </div>
        <FormOrderDetail order={order} />
      </Modal>
    </ConfigProvider>

  )
}

export default ModalOrder