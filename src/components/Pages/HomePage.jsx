import React from 'react'
import Banner from '../Banner/Banner.jsx'
import CoinsTable from '../CoinsTable.jsx'
import Spotlight from '../Spotlight.jsx'
import Header from '../Header.tsx'
function HomePage() {
  return (
    <>
        <Header />
        <Spotlight />
        <Banner />
        <CoinsTable />
    </>
  )
}

export default HomePage
