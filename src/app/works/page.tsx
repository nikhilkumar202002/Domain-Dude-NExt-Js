'use client'

import PortfolioBanner from "../components/page components/portfolio/Portfoliobanner"
import Portfoliolist from "../components/page components/portfolio/Portfoliolist"
import Portfoliocta from "../components/page components/portfolio/Portfoliocta"

const page = () => {
  return (
    <>
        <PortfolioBanner />
        <Portfoliolist />
        <Portfoliocta />
    </>
  )
}

export default page