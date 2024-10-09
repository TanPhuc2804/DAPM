import React from 'react';
import ProductCard from '../../Productcard';

const HotFashion = () => {
  const products = [
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a69afc4d8acaac091ce51ee0b5900f416148a397d4c9e6ad4c908e2be993b4ba?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "ÁO SƠ MI - AS003", price: "650.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/77a775d97af61199603d770c60d8895d5416ae798cadf2c62af809e954a6c5b1?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Áo sơ mi - AS230655D", price: "610.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bc15ba310a3d868ecfa198e6b0e45dd9816cf702f97eebc1bd3caf68c24f643?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Áo sơ mi - AR230663DT", price: "650.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f073c0550bfc4a1da7a091d7d1ee4501b90a828f1f9bdc5752683518b3f6aa8?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Áo sơ mi - AR230669DT", price: "550.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6572fe803d70fbb6252ff7ab076d67fcf8db657c7b905ec92e9c526ec2b05ee3?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Áo sơ mi - AS230699D", price: "750.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c844300685f40b122b095031ae044beb8b8ab970059b9b0eeece1404e8c9f99a?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Áo Jacket - JK231608", price: "1.000.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/47ed6c382a6b8d5bad443c98fea4790d6ee8a1762ec28e3e3e23f1e423568e60?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Áo khoác - JK241477", price: "1.650.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f3f3ee6cf4d03ab09a34bf90014a16f4be732a463bff24e51d875962956941d?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "Quần tây - QS242808", price: "650.000đ" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5b4557a9cb7edd6b1f3c3e8bf4e3426b164541960f3c16e301ac929af5f4fb6?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101", name: "ÁO SƠ MI - AS003", price: "650.000đ" }
  ];

  return (
    <section className="mt-32 ml-4 max-md:mt-10 max-md:max-w-full">
      <h2 className="text-5xl font-medium text-green-900 max-md:text-4xl">THỜI TRANG HOT</h2>
      <div className="mt-9 w-full max-w-[1474px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 max-md:flex-col">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotFashion;