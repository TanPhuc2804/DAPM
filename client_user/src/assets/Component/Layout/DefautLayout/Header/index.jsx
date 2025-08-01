import React from 'react';
import SupportBanner from '../SupportBanner';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header className="flex overflow-visible flex-col items-center bg-white relative">
    <SupportBanner />
    <Navigation />
    <div className="px-4 py-0.2 w-full text-xl font-light uppercase bg-green-300 text-stone-500 text-opacity-80 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      Be confident
    </div>
  </header>
  );
};

export default Header;
