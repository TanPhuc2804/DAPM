import React from 'react';

const DeliveryInfo = () => {
  return (
    <section className="flex flex-col px-2 pt-2 pb-10 mt-1 w-full rounded-2xl border border-solid border-neutral-200 min-h-[163px] max-md:max-w-full max-w-[500px] mx-auto ml-1">
      <div className="flex flex-wrap gap-3 items-start w-full max-md:max-w-full">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2279d180d24def9851316bda524c4271d37ca07888db725b80ec83e48a36c076?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" 
          alt="" 
          className="object-contain shrink-0 aspect-square w-[35px]" 
        />
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[180px] max-md:max-w-full">
          <h3 className="text-xl font-bold text-green-800">Free Delivery</h3>
          <p className="mt-1 text-lg text-stone-500">
            Enter your Postal code for Delivery Availability
          </p>
        </div>
      </div>
      <hr className="mt-4  w-full border border-solid border-neutral-200 min-h-[1px]" />
      <div className="flex flex-wrap gap-3 items-start mt-4 w-full max-md:max-w-full">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5def55b2ef7e59e45da7dd64a5860ff406b4f0960364bbdd97abdcb2401d53f?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" 
          alt="" 
          className="object-contain shrink-0 aspect-square w-[35px]" 
        />
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[180px] max-md:max-w-full">
          <h3 className="text-xl font-bold text-green-800">Return Delivery</h3>
          <p className="mt-1 text-lg text-stone-500">
            Free 30 days Delivery Return. <a href="#" className="underline">Details</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
