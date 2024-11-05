import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { openNotification } from '../../assets/hooks/notification';

function Success() {
  const { session_id } = useParams();
  const navigate = useNavigate(); // Khai báo useNavigate
  const urlParams = new URLSearchParams(window.location.search);
  const infor = urlParams.get("infor");

  useEffect(() => {
    if (session_id) {
      axios.post(`http://localhost:3000/checkout/complete/${session_id}`, JSON.parse(infor))
        .then(res => res.data)
        .then(data => {
          if (data.status) {
            openNotification(true, data.message, "Cảm ơn bạn đã đặt hàng !");
          }
        })
        .catch(err => {
          openNotification(false, err.message, ""); 
        });
    }
  }, [session_id, infor]); 

  const handleViewOrder = () => {
    navigate('/auth/StateOrder'); 
  };

  return (
    <section className="flex flex-col justify-center items-center self-center py-36 mt-24 w-full max-w-[1348px] min-h-[557px] max-md:py-24 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col justify-center items-center max-w-full text-center w-[1320px]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/11f6a88d98ddfb5a8ebce32fb3c44c3fe0b4eccdddcfaea1e6af56013ae070e7?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="Order confirmation icon" className="object-contain aspect-square w-[88px]" />
        <div className="flex flex-col justify-center items-center mt-6 w-full">
          <h1 className="text-4xl font-semibold leading-none text-zinc-900 max-md:max-w-full">
            Đơn hàng của bạn được đặt thành công
          </h1>
          <p className="mt-3 text-2xl leading-5 text-gray-500 w-[670px] max-md:max-w-full">
            Cảm ơn quý khách đã lựa chọn sản phẩm của chúng tôi. <br />
            Chúng tôi mong rằng nó sẽ mang lại sự tích cực đến với bạn
          </p>
        </div>
      </div>
      <div className="flex gap-3 items-start mt-8 text-sm font-bold tracking-normal leading-10 text-white uppercase">
        <button 
          onClick={handleViewOrder} 
          className="flex gap-2 justify-center items-center px-6 bg-green-900 rounded-sm max-md:px-5"
        >
          <span className="self-stretch my-auto">View Order</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ab68cf952556525285e41c808d54902d0bef89e42c4928a61c96657af8b450d?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
        </button>
      </div>
    </section>
  );
}

export default Success;
