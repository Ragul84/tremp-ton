import React from 'react';
import { FaTwitter, FaTelegram, FaChartBar } from 'react-icons/fa';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const Spotlight = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="relative mt-0 p-3 h-36 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden flex flex-col items-center justify-center">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={450} />
      <div className="absolute p-2 top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <div className="mt-3 w-full flex flex-col items-center">
          <h2 className="text-sm uppercase text-teal-200 font-bold text-center">
           
          </h2>
          <div className="bg-gray-700 mt-0 w-full md:w-3/4 h-24 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-medium">Banner Spot For Project Of The Week</span>
          </div>
          <div className="flex space-x-4 m-2">
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600 transition-transform duration-200 hover:scale-125">
              <FaTwitter size={24} />
            </a>
            <a href="https://telegram.org" className="text-sky-400 hover:text-sky-600 transition-transform duration-200 hover:scale-125">
              <FaTelegram size={24} />
            </a>
            <a href="#" className="text-green-400 hover:text-green-600 transition-transform duration-200 hover:scale-125">
              <FaChartBar size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
