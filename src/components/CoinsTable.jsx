import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { FaRocket } from 'react-icons/fa'
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function CoinsTable() {
  const [coins, setCoins] = useState('')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [symboll, setSymboll] = useState('')
  const [contract, setContract] = useState('')
  const [logo, setLogo] = useState('')
  const [telegram, setTelegram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [website, setWebsite] = useState('')
  const [owner, setOwner] = useState('')
  const [number, setNumber] = useState('1')

  const handleForm = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3000/form', {
      name,
      symboll,
      contract,
      logo,
      telegram,
      twitter,
      website,
      owner,
    })
    if (response.status === 201) {
      toast.success(
        'Token Details Sent Successfully! Our Team Will Get In Touch With You'
      )
    } else {
      toast.error('Token Details Sent Error, Try Again Later')
    }
  }

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://api.geckoterminal.com/api/v2/networks/ton/tokens/multi/EQATcUc69sGSCCMSadsVUKdGwM1BMKS-HKCWGPk60xZGgwsK%2CEQBZ_cafPyDr5KUTs0aNxh0ZTDhkpEZONmLJA2SNGlLm4Cko%2CEQC47093oX5Xhb0xuk2lCr2RhS8rj-vul61u4W2UH5ORmG_O%2CEQALAf58SiRriRr9CloeebCG8NrdYfYCCkjR5UMZqw_OkkwK%2CEQCJbp0kBpPwPoBG-U5C-cWfP_jnksvotGfArPF50Q9Qiv9h%2CEQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO%2CEQCbKMTmEAdSnzsK85LOpaDkDH3HjujEbTePMSeirvEaNq-U'
        )
        const coinsData = response.data.data.map((coin) => ({
          id: coin.id,
          ...coin.attributes,
        }))
        setCoins(coinsData)
      } catch (error) {
        console.error('Error fetching coins:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <div className="  px-4 py-8 bg-gray-800 rounded-lg shadow-md">
      <Toaster />
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Discover Potential, Carefully Vetted Tokens in TON Ecosystem
      </h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search For A Coin..."
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-lg rounded-lg p-3 w-full max-w-xl text-gray-700"
        />
      </div>
      {loading ? (
        <div className="h-2 bg-blue-400 rounded-full animate-pulse"></div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-black">
                <tr>
                  {['Coin', 'Price', 'Volume', 'Market Cap', 'vote'].map(
                    (head) => (
                      <th key={head} className="py-3 px-2">
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-700">
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((coin) => (
                    <tr
                      key={coin.id}
                      className="hover:bg-gray-600"
                      onClick={() => navigate(`/coins/${coin.id}`)}
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={coin.image_url}
                            alt={coin.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium text-white">
                            {coin.name} ({coin.symbol})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right text-white">
                        ${parseFloat(coin.price_usd).toFixed(4)}
                      </td>
                      <td className="py-3 px-2 text-right text-white">
                        {coin.volume_usd?.h24
                          ? `$${numberWithCommas(
                              parseFloat(coin.volume_usd.h24).toFixed(3)
                            )}`
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-2 text-right text-white">
                        ${numberWithCommas(coin.fdv_usd)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <FaRocket className='text-white ms-2 cursor-pointer text-xl'/>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex mb-4 justify-center space-x-4 mt-6">
            <button
              className="btn btn-primary"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
          <hr></hr>
          <h2 className="mt-2 text-xl uppercase text-cyan-50 font-bold">
            {' '}
            Submit Your Project:
          </h2>
          <div className="m-3 p-3 mt-7 rounded-lg bg-gray-600">
            <tr className="mt-7">
              <th className="text-2xl uppercase text-blue-400"></th>
              <th></th>
            </tr>
            <form
              onSubmit={handleForm}
              className=" max-w-4xl mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                {/* First Column */}
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Project Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Project Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="symbol"
                    >
                      Symbol
                    </label>
                    <input
                      onChange={(e) => setSymboll(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="symbol"
                      type="text"
                      placeholder="Symbol"
                    />
                    <label
                      className="block text-sm font-bold mt-3"
                      htmlFor="symbol"
                    >
                      Logo
                    </label>
                    <input
                      onChange={(e) => setLogo(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="symbol"
                      type="text"
                      placeholder="Paste Your Logo URL"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="contract-address"
                    >
                      Contract Address
                    </label>
                    <input
                      onChange={(e) => setContract(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="contract-address"
                      type="text"
                      placeholder="Contract Address"
                    />
                  </div>
                </div>
                {/* Second Column */}
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="telegram-link"
                    >
                      Telegram Link
                    </label>
                    <input
                      onChange={(e) => setTelegram(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="telegram-link"
                      type="text"
                      placeholder="Telegram Link"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="twitter-link"
                    >
                      Twitter Link
                    </label>
                    <input
                      onChange={(e) => setTwitter(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="twitter-link"
                      type="text"
                      placeholder="Twitter Link"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="website"
                    >
                      Website
                    </label>
                    <input
                      onChange={(e) => setWebsite(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      id="website"
                      type="text"
                      placeholder="Website"
                    />
                  </div>
                </div>
              </div>
              {/* Owner's Telegram ID */}
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="owners-telegram-id"
                >
                  Contact Details
                </label>
                <input
                  onChange={(e) => setOwner(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="owners-telegram-id"
                  type="text"
                  placeholder="Owner's Telegram ID"
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default CoinsTable
