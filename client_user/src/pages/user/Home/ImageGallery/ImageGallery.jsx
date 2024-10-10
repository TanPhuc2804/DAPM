import React from 'react';

const ImageGallery = () => {
  return (
    <div className="mt-28 w-full max-w-[1604px] max-md:mt-10 max-md:max-w-full mx-auto"> {/* Căn giữa phần tử */}
      <div className="flex justify-center gap-5 max-md:flex-col">
        <div className="flex flex-col w-[20%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/50f7e6c84e7e69ecf00b95612356e8eb03f4c7ead909be1b3c5b27b9c98929f2?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
            alt="Fashion item 1"
            className="object-contain shrink-0 max-w-full aspect-[0.73] w-[340px] max-md:mt-10 transition duration-300 hover:brightness-75" 
          />
        </div>
        <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6491d36886086cc30eb6b148e59623abe03b881d9602bf05c185eee81eeb52b7?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
            alt="Fashion item 2"
            className="object-contain w-full aspect-[1.78] max-md:mt-10 max-md:max-w-full transition duration-300 hover:brightness-75" 
          />
        </div>
        <div className="flex flex-col ml-5 w-[20%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4971016c502d660cea1c3b7fedf2727246d8f6668ee7407b7129e5cefee08de7?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
            alt="Fashion item 3"
            className="object-contain grow shrink-0 max-w-full aspect-[0.74] w-[353px] max-md:mt-10 transition duration-300 hover:brightness-75" 
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
