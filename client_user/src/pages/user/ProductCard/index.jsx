import axios from "axios";
import { Link } from "react-router-dom";
const ProductCard = ({ _id, image, name, price, originalPrice, discount }) => {

  return (
    <Link to={`/list-products/${_id}`}>
      <div className="flex flex-col rounded-2xl max-md:max-w-full">
        <div className="flex flex-col items-center px-5 pt-5 pb-20 w-full bg-white rounded-2xl max-md:max-w-full">
          <div className="flex relative flex-col items-start self-stretch px-4 pt-5 text-3xl font-extralight leading-none text-black whitespace-nowrap bg-blend-darken min-h-[550px] pb-[498px] max-md:pr-5 max-md:pb-24 max-md:max-w-full">
            <img loading="lazy" src={image} alt={name} className="object-cover absolute inset-0 size-full" />
            <div className="relative px-3.5 py-2 mb-0 bg-yellow-400 max-md:mb-2.5">{discount}</div>
          </div>
          <h3 className="mt-11 text-2xl font-bold leading-none text-center text-black max-md:mt-10">{name}</h3>
          <div className="flex gap-9 mt-7 max-w-full whitespace-nowrap w-[242px]">
            <div className="grow shrink text-2xl font-bold leading-none text-orange-600 w-[93px]">{price}</div>
            <div className="text-xl font-extralight leading-none text-black">{originalPrice}</div>
          </div>
        </div>
      </div>
    </Link>

  );
};

export default ProductCard;
