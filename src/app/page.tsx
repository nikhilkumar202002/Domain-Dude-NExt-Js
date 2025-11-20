'use client'

import Banner from "./components/page components/home/Banner"
import Clientslider from "./components/common/Clientslider"
import Aboutsection from "./components/page components/home/Aboutsection"
import Servicesection from "./components/page components/home/Servicesection"
import Portfolio from "./components/page components/home/Portfolio"

const page = () => {
  return (
    <>
      <Banner />
      <Clientslider/>
      <Aboutsection/>
      <Servicesection/>
      <Portfolio/>
    </>
  )
}

export default page