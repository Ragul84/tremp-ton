import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Submit = () => {
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

  return (
    <>
      <form
        onSubmit={handleForm}
        className=" max-w-4xl mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          {/* First Column */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
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
              <label className="block text-sm font-bold mb-2" htmlFor="symbol">
                Symbol
              </label>
              <input
                onChange={(e) => setSymboll(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                id="symbol"
                type="text"
                placeholder="Symbol"
              />
              <label className="block text-sm font-bold mt-3" htmlFor="symbol">
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
              <label className="block text-sm font-bold mb-2" htmlFor="website">
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
    </>
  )
}

export default Submit
