"use client";

import { MdArrowOutward } from "react-icons/md";
import { serviceListData } from "../../../data/ServiceData"; 
import "./Service.css";

const Servicelist = () => {
  return (
    <>
      <section className="service-list">
        <div className="container">
          <div className="service-list-flex flex flex-col md:flex-row gap-10 md:gap-30">
            
            {/* Header Section - 40% Width */}
            <div className="service-list-header w-full md:w-[30%]">
              <h2>Build. <span>Scale.</span> Market.</h2>
              <p>
                Domain Dude blends strategy, design, development, and
                performance marketing to grow your brand online, from
                conversion-focused websites to data-driven campaigns that
                attract, engage, and convert your ideal audience.
              </p>
            </div>

            {/* Content Section - 60% Width */}
            <div className="service-list-content w-full md:w-[70%]">
              
              {serviceListData.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`service-list-card ${
                    // Apply border and padding to all EXCEPT the last card
                    index !== serviceListData.length - 1 
                      ? "border-b border-[#ffffff20] pb-10 mb-10" 
                      : ""
                  }`}
                >
                  <div className="service-list-card-header">
                    <h4>{service.id}. {service.title}</h4>
                    <p>{service.description}</p>

                    <div className="service-list-card-keypoints flex gap-2 pt-[20px]">
                      {service.keyPoints.map((point, i) => (
                        <div key={i} className="service-list-card-keypoint">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="service-list-card-cta pt-5">
                    <a href={service.link} className="flex items-center gap-2">
                      Learn More
                      <span>
                        <MdArrowOutward />
                      </span>
                    </a>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicelist;