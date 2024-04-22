import React from 'react'
import Carousel from './Carousel'
import Spotlight from '../Spotlight'
function Banner() {
  return (
    <div className=" text-white py-12 headerDa">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-montserrat">
          TON 24 HOUR Trending Pools
        </h2>
        <p className="text-lg text-gray-400 capitalize font-montserrat mb-6">
          Powered By RECA - The Resistance Cat
        </p>
        <Carousel />
      </div>
    </div>
  )
}

export default Banner
