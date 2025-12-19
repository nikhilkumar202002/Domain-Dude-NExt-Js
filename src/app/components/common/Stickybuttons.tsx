'use client'

import { IoLogoWhatsapp } from "react-icons/io5";
import { IoMailUnreadOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";

import "./Styles.css";

const Stickybuttons = () => {
  return (
    <>
        <div className="sticky-buttons">
            <div className="sticky-button-item">
                <a href="tel:919048006320"><LuPhoneCall /></a>
            </div>
                 <div className="sticky-button-item">
                <a href="mailto:info@domaindude"><IoMailUnreadOutline /></a>
            </div>

                 <div className="sticky-button-item">
                <a href="https://wa.me/919048006320?text=Hi%20Domain%20Dude%2C%20I%27d%20like%20to%20discuss%20a%20new%20project.%20Can%20you%20help%20me%20with%20my%20brand%20and%20website%3F"><IoLogoWhatsapp /></a>
            </div>
        </div>
    </>
  )
}

export default Stickybuttons