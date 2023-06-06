import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <div className="flex flex-row h-screen w-screen overflow-hidden ">
        <div className="flex flex-col justify-between w-full">
          <Header />
          <div className="flex-1 flex flex-col justify-center items-center">{<Outlet />}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
