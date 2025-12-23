'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { webDevAccordionData } from '../../../data/AllServiceData' 
// Updated Import: Point to the shared CSS Module
import styles from "../Styles/ServiceDetail.module.css"; 

gsap.registerPlugin(ScrollTrigger);

const Webdevelopmentcontent = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const paragraphText = "Modern search engines reward websites that are fast, easy to navigate, and technically sound, so web development and SEO have to work together. Domain Dude structures pages with semantic HTML, clear headings, internal links, and optimized media, making it easier for search engines to crawl and index your content while giving users a smooth browsing experience.";

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
        {/* Updated ClassName: webdev-content -> sectionContent */}
        <section className={styles.sectionContent} ref={containerRef}>
            <div className={`${styles.container} container`}>
                 
                 {/* Updated ClassName: webdev-content-header -> sectionHeader */}
                 <div className={styles.sectionHeader} ref={headerRef}>

                    <h2>
                        {splitWordsH2("Why ")}
                        {/* Updated ClassName: webdev-content-header-highlight -> highlight */}
                        <span className={styles.highlight}>
                            {splitWordsH2("our web ")}
                        </span>
                        {splitWordsH2("development ?")}
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

                 {/* Updated ClassName: webdev-content-accordian -> accordion */}
                 <div className={styles.accordion} ref={accordionRef}>
                    {webDevAccordionData.map((item) => (
                        // Updated ClassName: webdev-content-accordian-items -> accordionItem
                        <div className={styles.accordionItem} key={item.id}>
                            {/* Updated ClassName: webdev-content-accordian-first -> colFirst */}
                            <div className={styles.colFirst}>
                                <h2>{item.id}.</h2>
                            </div>

                            {/* Updated ClassName: webdev-content-accordian-middle -> colMiddle */}
                            <div className={styles.colMiddle}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>

                            {/* Updated ClassName: webdev-content-accordian-last -> colLast */}
                            <div className={styles.colLast}>
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

export default Webdevelopmentcontent