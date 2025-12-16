"use client"

import AboutBanner from "../components/page components/about/AboutBanner"
import Howwework from "../components/page components/about/Howwework"
import Aboutcompany from "../components/page components/about/Aboutcompany"
import Teammembers from "../components/page components/about/Teammembers"

const page = () => {
  return (
    <>
        <AboutBanner/>
        <Aboutcompany/>
        <Howwework/>
        <Teammembers/>
    </>
  )
}

export default page