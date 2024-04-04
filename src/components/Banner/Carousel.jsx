import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Toaster } from 'react-hot-toast'
import { TrendingCoins } from '../config/api'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function Carousel() {
  const [trending, setTrending] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchTrendingCoins = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(TrendingCoins())

      setTrending(data.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching trending coins:', error)
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <div className="text-white ">
      <Toaster />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching data. Please try again later.</div>
      ) : (
        <Slider {...settings}>
          {trending.map((coin) => {
            const { attributes } = coin
            return (
              <div
                key={coin.id}
                className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-xl"
              >
                <div className="text-xl font-bold mb-2">{attributes.name}</div>
                <div className="text-lg mb-1">
                  Base Token Price (USD): $
                  {parseFloat(attributes.base_token_price_usd).toFixed(4)}
                </div>
                <div className="text-lg">
                  Quote Token Price (USD): $
                  {numberWithCommas(attributes.quote_token_price_usd)}
                </div>
              </div>
            )
          })}
        </Slider>
      )}
    </div>
  )
}

export default Carousel
