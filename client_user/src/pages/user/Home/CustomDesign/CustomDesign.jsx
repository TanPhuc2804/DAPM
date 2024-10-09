import React from 'react';

const CustomDesign = () => {
  const categories = [
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e51d99298234e19d71e403b785250fa1109736a6c4644982dc1ccc2da4ba0400?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", title: "Accessories", description: "Hoàn thành bộ trang phục của bạn với các phụ kiện thiết kế đầy ấn tượng" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b6c20b3f9b4bde890227d1c29725faea1442fabc2b4527d911d9040df510a0e?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", title: "Quần", description: "Khám phá các loại quần mang lại sự dễ chịu và lịch lãm" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ee8c4329059951e64b131b978f5e570f0c029f7684eeb1649c2dfcefafc63aef?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", title: "Outerwear", description: "Áo khoác mang lại sự ấm cúng cho cơ thể và sang trọng cho outfit của chúng ta" }
  ];

  return (
    <section className="mt-50 my-3 max-md:mt-10 max-md:max-w-full">
      <h2 className="text-5xl font-medium text-green-900 max-md:text-4xl">Thiết kế quần áo cho chính bạn</h2>
      <p className="mt-12 text-2xl font-medium text-green-900 max-md:mt-10 max-md:max-w-full">
        Đắm chìm trong thế giới thời trang xa xỉ với thiết kế quần áo được chế tác tỉ mỉ của chúng tôi!
      </p>
      <div className="mt-30 my-12 w-full max-w-[1377px]  max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-center text-neutral-700 max-md:mt-10">
                <div className="h-[600px] overflow-hidden relative"> {/*  chiều cao hình */}
                  <img loading="lazy" src={category.image} alt={category.title} className="object-cover w-full h-full" /> {/* Sử dụng object-cover */}
                </div>
                <h3 className="self-center mt-6 text-3xl font-semibold">{category.title}</h3>
                <p className="mt-1.5 text-2xl font-medium leading-8">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomDesign;
