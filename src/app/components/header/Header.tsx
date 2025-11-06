'use client'

import React from 'react';
import Logo from "../../../assets/Domine Dude white.svg";
import Image from 'next/image';
import "./Header.css";

const Header = () => {
  return (
    <>
        <nav>
            <section className='navbar'>
                    <div className="navbar-container">
                        <div className="navbar-flex">
                            <div className="logo">
                                <Image src={Logo} alt='Domain Dude' width={150} height={0}/>
                            </div>

                            <div className="navbar-items">
                                <div className="navbar-item">
                                    <a href="#">Home</a>
                                </div>
                                <div className="navbar-item">
                                    <a href="#">About</a>
                                </div>
                                <div className="navbar-item">
                                    <a href="#">What we do</a>
                                </div>
                                <div className="navbar-item">
                                    <a href="#">Works</a>
                                </div>
                                <div className="navbar-item">
                                    <a href="#">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </nav>
    </>
  )
}

export default Header