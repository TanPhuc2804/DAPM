import React from 'react';

const Size = ({ selectedSize, setSelectedSize, productSizes }) => {
    const sizes = productSizes.sort((a, b) => parseInt(a.size) - parseInt(b.size));
    console.log(productSizes)
    const handleScrollToSizeGuide = () => {
        const element = document.getElementById('size-guide');
        if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let startTime = null;

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);

                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            const easeInOutCubic = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <div className="flex flex-col mt-3 max-w-full font-medium min-h-[130px] w-[462px] lg:w-1/2">
            <div
                className="text-2xl text-yellow-400 text-left underline cursor-pointer"
                onClick={handleScrollToSizeGuide}
            >
                Hướng dẫn chọn size
            </div>
            <div className="mt-3.5 text-xl text-gray-400 text-left">Chọn size</div>
            <div className="grid grid-cols-5 gap-5 mt-3.5 max-w-full text-xl text-black">
                {console.log(sizes)}
                {sizes.map((size) => {
                    console.log(size)
                    return (
                        <div key={size.size} className="flex-1">
                            <button
                                className={`px-3.5 border border-black border-solid h-[50px] w-[50px] text-left ${selectedSize === size ? 'bg-gray-300' : 'bg-white'}`}
                                onClick={() => setSelectedSize(size)} // Cập nhật kích thước  chọn
                            >
                                {size.size}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Size;
