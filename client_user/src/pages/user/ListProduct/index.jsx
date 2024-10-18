import React from 'react';
import Breadcrumb from './Breadcrumb/Breadcrumb';
import HeroBanner from './HeroBanner/Banner';
import Sidebar from './sidebar/sidebar';
import ProductGrid from './ProductGrid/ProductGrid';
import InfoSection from './InfoSection/InfoSection';

function ListProduct() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <main>
        <Breadcrumb />
        <HeroBanner />
        <div className="flex max-w-auto mx-auto p-5">

          <div className="w-[200px] sticky top">
            <Sidebar />
            
          </div>
          
          <div className="flex-1 ml-5">
            <ProductGrid />
          </div>
        </div>
        <InfoSection />
      </main>
    </div>
  );
}

export default ListProduct;
