import React, { useState } from 'react';
import { useInfor } from '../../../../assets/hooks/inforOrder.context';

const paymentMethods = [
  { name: 'Thanh toán khi nhận hàng', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8c001ac09fd9daed91303d647a3d139c287df1b25dd0afe39b756aaf4642de55?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101' },
  { name: 'Momo', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d1a3fea8bea24d96d7df3b2ed7d2669273932cc8af473f68812441727044f9cc?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101' },
  { name: 'Paypal', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/61d9315ba922990ac212cdf7da42cb3af1974de2d783e3c88592473cc5e10e4a?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101' },
  { name: 'Amazon Pay', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7797b434a156e15cf0a15e8caf606081ffb7e0347c448b208c337c770afcc559?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101' },
];

function PaymentOptions() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const {setInfor} = useInfor()
  const handleSelect = (event) => {
    setSelectedMethod(event.target.value)
    setInfor(pre => ({
      ...pre,
      [event.target.name]:event.target.value
    }))
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center items-center pt-5 pb-8 mt-10 max-w-full font-medium bg-white rounded border border-gray-200 border-solid text-zinc-900 w-[900px]">
      <h3 className="text-2xl leading-none max-md:max-w-full">Tùy chọn thanh toán</h3>
      <div className="grid grid-cols-4 gap-6 items-start px-6 pt-6 pb-12 mt-5 w-full text-2xl leading-none text-center bg-white border border-gray-200 border-solid min-h-[247px] max-md:px-5">
        {paymentMethods.map((method) => (
          <label
            key={method.name}
            className="flex flex-col justify-center items-center leading-5 min-h-[177px] transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center w-40 max-w-full">
              <img loading="lazy" src={method.image} alt={method.name} className="object-contain aspect-square w-[82px]" />
              <div className="mt-2">{method.name}</div>
            </div>
            <input
              type="radio"
              name="paymentMethod"
              value={method.name}
              checked={selectedMethod === method.name}
              onChange={handleSelect}
              className="mt-4 w-5 h-5"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default PaymentOptions;
