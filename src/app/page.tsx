'use client'

import Banner from "./components/page components/home/Banner"
import ClientList from "./components/common/ClientList"
import Aboutsection from "./components/page components/home/Aboutsection"
// import Counter from "./components/common/Counter"
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

      <div id="main-flow" className="theme-transition-wrapper bg-black relative">
        <Aboutsection />
        {/* <Counter /> */}
        <Portfolio />
        <Toolssection />
        <ClientList />
        <Servicesection />
      </div>

      <div id="footer-flow" className="theme-transition-wrapper bg-black relative">
        <Testimonial />
        <Faq />
      </div>
    </SmoothScrolling>
  )
}

export default Page
