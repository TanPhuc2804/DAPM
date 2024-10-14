import axios from "axios";
import { Link } from "react-router-dom";
const ProductCard = ({ _id,image, name, price, originalPrice, discount, description }) => {
  return (
    <div className="flex flex-col w-full rounded-1xl max-md:max-w-full overflow-hidden group max-w-[380px] mx-4 my-2 transition-all duration-300 hover:shadow-lg hover:border hover:border-black"> {/* Thêm hiệu ứng hover */}
      <div className="flex flex-col items-center px-1 pt-2 pb-4 w-full bg-white rounded-2xl">
        <div className="flex relative flex-col items-center self-stretch px-2 pt-3 text-2xl font-extralight leading-none text-black whitespace-nowrap bg-blend-darken min-h-[400px] pb-4 max-md:pr-5 max-md:pb-16">
          <img 
            loading="lazy" 
            src={image} 
            alt={name} 
            className="object-cover w-full h-full transition duration-300 group-hover:opacity-75"
          />
          {discount && (
            <div className="absolute top-9 left-10 px-3.5 py-2 mb-0 bg-yellow-400">{discount}</div>
          )}
          <Link to={`/product/${_id}`} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gray-400 text-white font-rosarivo rounded transition duration-300 opacity-0 group-hover:opacity-100 hover:bg-[#FF5C00]">
            MUA NGAY
          </Link>
        </div>
        <h3 className="mt-3 text-xl font-bold leading-none text-center text-black max-md:mt-4 group-hover:text-2xl transition duration-300">{name}</h3>
        <p className="mt-1 text-lg text-gray-600 text-center group-hover:text-xl transition duration-300">{description}</p>
        <div className="flex gap-5 mt-2 max-w-full whitespace-nowrap w-[100px]"> 
          <div className="grow shrink text-xl font-bold leading-none text-orange-600">{price}</div>
          {originalPrice && (
            <div className="text-lg font-extralight leading-none text-black line-through">{originalPrice}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
