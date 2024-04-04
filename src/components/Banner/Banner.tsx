import React from 'react';
import Carousel from './Carousel';

function Banner() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-montserrat">
          Discover The Market
        </h2>
        <p className="text-lg text-gray-400 capitalize font-montserrat mb-6">
          TON Trending Pools
        </p>
        <Carousel />
      </div>
    </div>
  );
}

export default Banner;
