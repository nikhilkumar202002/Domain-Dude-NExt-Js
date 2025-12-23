'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
// 1. Updated Import: Fetch UI/UX Data instead of Web Dev
import { uiUxAccordionData } from '../../../data/AllServiceData' 
import Styles from '../Styles/ServiceDetail.module.css' 

gsap.registerPlugin(ScrollTrigger);

const DesignContent = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const paragraphText = "Modern SEO and performance depend on how users interact with your site—better UX often leads to longer sessions, lower bounce rates, and stronger conversion signals. Domain Dude combines research, wireframes, and prototypes with visually striking UI so your product not only looks good but also supports measurable business outcomes.";

  const splitWordsH2 = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="inline-block overflow-hidden align-top">
        <span className="h2-word-span inline-block opacity-0 translate-y-10">{word}&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    // 1. H2 Title Reveal
    const h2Words = headerRef.current?.querySelectorAll('.h2-word-span');
    if (h2Words && h2Words.length > 0) {
      gsap.to(h2Words, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        }
      });
    }

    // 2. Paragraph Text Fill Flow
    const pWords = textRef.current?.querySelectorAll(".word-span");
    if (pWords && pWords.length > 0) {
      gsap.fromTo(
        pWords,
        { color: "rgba(255, 255, 255, 0.2)" }, 
        {
          color: "#ffffff",
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%", 
            end: "bottom 55%", 
            scrub: 1,
          },
        }
      );
    }

    // 3. Accordion Items Staggered Reveal
    const items = accordionRef.current?.children;
    if (items && items.length > 0) {
        gsap.fromTo(items, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: accordionRef.current,
                    start: "top 75%",
                }
            }
        );
    }

  }, { scope: containerRef });

  return (
    <>
        <section className={Styles.sectionContent} ref={containerRef}>
            <div className={`${Styles.container} container`}>
                 
                 <div className={Styles.sectionHeader} ref={headerRef}>
                    <h2>
                        {splitWordsH2("Why ")}
                        <span className={Styles.highlight}>
                            {splitWordsH2("our UI/UX ")}
                        </span>
                        {splitWordsH2("design ?")}
                    </h2>

                    <p ref={textRef}>
                      {paragraphText.split(" ").map((word, index) => (
                        <React.Fragment key={index}>
                          <span className="word-span inline-block">{word}</span>
                          {" "}
                        </React.Fragment>
                      ))}
                    </p>
                 </div>

                 <div className={Styles.accordion} ref={accordionRef}>
                    {/* 2. Map over the UI/UX Data */}
                    {uiUxAccordionData.map((item) => (
                        <div className={Styles.accordionItem} key={item.id}>
                            <div className={Styles.colFirst}>
                                <h2>{item.id}.</h2>
                            </div>

                            <div className={Styles.colMiddle}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>

                            <div className={Styles.colLast}>
                                <Image src={item.image} alt={item.title} width={350}/>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </section>
    </>
  )
}

export default DesignContent