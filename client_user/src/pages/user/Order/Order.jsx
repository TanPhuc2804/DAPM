import React, { useState } from 'react';

import Breadcrumb from './Breadcrumb/Breadcrumb';
import OrderForm from './OrderForm/OrderForm';
import PaymentOptions from './paymentMethods/paymentMethods';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import OrderSummary from './OrderSummary/OrderSummary';
import { useInfor } from '../../../assets/hooks/inforOrder.context';
function OrderCus() {
  
  return (
    <div>
      <Breadcrumb />
      <div className="flex gap-6 items-start pt-20 pr-6 pl-36 mt-1.5 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex  flex-col grow shrink items-start min-h-[1172px] w-[60%] bg-white p-4">
          <div className=" max-h-[460px]">
            <OrderForm/>
          </div>
          <PaymentOptions  />
          <AdditionalInfo />
        </div>

        <div className="w-[40%]">
          <OrderSummary/>
        </div>
      </div>
    </div>
  );
}

export default OrderCus;
