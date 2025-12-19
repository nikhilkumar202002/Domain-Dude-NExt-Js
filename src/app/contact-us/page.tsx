'use client'

import ContactBanner from "../components/page components/contact/Contactbanner"
import Contactform from "../components/page components/contact/Contactform"
import Contactfaq from "../components/page components/contact/Contactfaq"

const page = () => {
  return (
    <>
      <ContactBanner />
      <Contactform />
      <Contactfaq />
    </>
  )
}

export default page