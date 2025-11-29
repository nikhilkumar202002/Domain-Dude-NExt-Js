'use client'

import Banner from "./components/page components/home/Banner"
import Clientslider from "./components/common/Clientslider"
import Aboutsection from "./components/page components/home/Aboutsection"
import Servicesection from "./components/page components/home/Servicesection"
import Portfolio from "./components/page components/home/Portfolio"
import Testimonial from "./components/page components/home/Testimonial"
import Faq from "./components/page components/home/Faq"

const page = () => {
  return (
    <>
      <Banner />
      <Clientslider/>
      <Aboutsection/>
      <Servicesection/>
      <Portfolio/>
      
      {/* WRAPPER FOR COLOR TRANSITION 
        Start with bg-black. The FAQ component will animate this to white.
      */}
      <div className="theme-transition-wrapper bg-[#00000] relative">
        <Testimonial/>
        <Faq/>
      </div>

    </>
  )
}

export default page