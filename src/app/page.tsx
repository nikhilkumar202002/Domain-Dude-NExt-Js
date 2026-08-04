'use client'

import Banner from "./components/page components/home/Banner"
import ClientList from "./components/common/ClientList"
import Aboutsection from "./components/page components/home/Aboutsection"
import Servicesection from "./components/page components/home/Servicesection"
import Portfolio from "./components/page components/home/Portfolio"
import Testimonial from "./components/page components/home/Testimonial"
import Toolssection from "./components/page components/home/Toolssection"
import Faq from "./components/page components/home/Faq"
import SmoothScrolling from "./components/common/SmoothScrolling" 

const Page = () => {
  return (
    <SmoothScrolling>
      <Banner />
      
      {/* FLOW 1: About (Black) -> Tools (White) -> Service (Black) -> Portfolio (Black) */}
      <div id="main-flow" className="theme-transition-wrapper bg-black relative transition-colors duration-500 ease-linear">
          <Aboutsection/>
          <Toolssection/>
      <ClientList />

          <Servicesection/>
          <Portfolio/>

      </div>
   
      {/* FLOW 2: Testimonial (Black) -> Faq (White) */}
      <div id="footer-flow" className="theme-transition-wrapper bg-black relative transition-colors duration-500 ease-linear">
        <Testimonial/>
        <Faq/>
      </div>
    </SmoothScrolling>
  )
}

export default Page
