"use client"

import ServiceBanner from "../components/page components/what-we-do/Servicebanner"
import Servicelist from "../components/page components/what-we-do/Servicelist"
import Serivcetechstack from "../components/page components/what-we-do/Servicetechstack"

const page = () => {
  return (
    <>
        <ServiceBanner/>
        <Servicelist/>
        <Serivcetechstack/>
    </>
  )
}

export default page