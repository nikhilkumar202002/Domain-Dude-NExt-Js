'use client'

import MainButton from "../../common/MainButton";
import "./Home.css";

const Banner = () => {
  return (
    <>
        <section className="banner">
            <div className="banner-container container">
                <div className="banner-content">
                    <h1>Leading Website Development & Digital Marketing Agency <span className="banner-content-highlight">in Kochi.</span></h1>
                    <p>We crafts stunning websites and data-driven marketing strategies that help brands grow online and attract more customers.</p>
                    <div className="banner-counter">
                        <h3>Trusted by 100+ Brands Worldwide</h3>
                        <div className="banner-counters">
                            <div className="banner-counters-item">
                                <h4>11+</h4>
                                <p>Years of Experience</p>
                            </div>

                              <div className="vertical-line"></div>
                              <div className="banner-counters-item">
                                <p>Global Clients</p>
                            </div>
                              <div className="vertical-line"></div>

                              <div className="banner-counters-item">                               
                                <p>360° Digital Solutions</p>
                            </div>
                        </div>
                    </div>
                    <div className="banner-btn">
                        <MainButton label="Let’s Build Something" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Banner