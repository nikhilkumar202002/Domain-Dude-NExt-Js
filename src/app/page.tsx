'use client'

import Banner from "./components/page components/home/Banner"
import Clientslider from "./components/common/Clientslider"
import Aboutsection from "./components/page components/home/Aboutsection"
import Servicesection from "./components/page components/home/Servicesection"
import Portfolio from "./components/page components/home/Portfolio"
import Testimonial from "./components/page components/home/Testimonial"
import Toolssection from "./components/page components/home/Toolssection"
import Faq from "./components/page components/home/Faq"

const page = () => {
  return (
    <>
      <Banner />
      <Clientslider/>
      <Aboutsection/>
      <Toolssection/>
      <Servicesection/>
      <Portfolio/>
      <div className="theme-transition-wrapper bg-[#00000] relative">
        <Testimonial/>
        <Faq/>
      </div>

    </>
  )
}

export default page