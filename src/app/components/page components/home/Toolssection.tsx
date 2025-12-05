"use client"

import "./Home.css";

const Toolssection = () => {
  return (
    <>
        <section className="tools">
            <div className="tools-container container">
                <div className="tools-header-flex grid grid-cols-2 gap-20">
                    <div className="tools-header-left">
                        <h4>Tools We Use</h4>
                        <h2>Empowering <span className="tools-header-highlight">Digital Growth</span> for Businesses</h2>
                        {/* <h3><span className="tools-header-counter">50+</span> Tools Adopted Across Projects</h3> */}
                        <p>At Domain Dude, we rely on industry-leading tools and technologies to deliver high-performance digital solutions. From design and development to analytics and automation, these tools help us build faster, scale smarter, and deliver exceptional results with confidence.</p>
                    </div>
                    
                    <div className="tools-header-right grid grid-cols-2 gap-4">
                        <div className="tools-header-card">
                            <h3>99%</h3>
                            <p>Seamless integration & workflow efficiency</p>
                        </div>

                          <div className="tools-header-card">
                            <h3>40%</h3>
                            <p>Average productivity boost for clients using our tech stack</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Toolssection