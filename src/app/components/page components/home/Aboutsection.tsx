"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCopy, FiThumbsUp, FiThumbsDown, FiRotateCw } from "react-icons/fi";
import "./Aboutsection.css";

gsap.registerPlugin(ScrollTrigger);

const headingLine1 = "Building a business is hard enough.";
const headingLine2 = "Why is going digital another full-time job?";

const Aboutsection = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const aiThinkingRef = useRef<HTMLSpanElement>(null);
  const aiReplyTextRef = useRef<HTMLParagraphElement>(null);
  const aiBottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !stickyRef.current) return;

      const words = headingRef.current?.querySelectorAll(".heading-word");
      const bubble2 = card1Ref.current?.querySelector(".whatsapp-bubble-bottom");

      // Initial state: Heading words
      if (words?.length) {
        gsap.set(words, { autoAlpha: 0, y: 24 });
      }

      // Initial states: All 4 cards centered and hidden
      gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
        autoAlpha: 0,
        scale: 0.88,
        y: 40,
        rotation: 0,
      });

      if (bubble2) {
        gsap.set(bubble2, { autoAlpha: 0, scale: 0.85, y: 10 });
      }

      if (aiThinkingRef.current) gsap.set(aiThinkingRef.current, { autoAlpha: 0 });
      if (aiReplyTextRef.current) gsap.set(aiReplyTextRef.current, { autoAlpha: 0, y: 8 });
      if (aiBottomBarRef.current) gsap.set(aiBottomBarRef.current, { autoAlpha: 0 });

      // Unified Scrub Timeline: Displays one card at a time in the center
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
        },
      });

      // 0. Heading reveal
      if (words?.length) {
        tl.to(
          words,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
            stagger: 0.015,
            ease: "power2.out",
          },
          0.0,
        );
      }

      // ----------------------------------------------------
      // BEAT 1: CARD 1 (WhatsApp)
      // ----------------------------------------------------
      // Enters
      tl.to(
        card1Ref.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotation: -1,
          duration: 0.06,
          ease: "back.out(1.4)",
        },
        0.08,
      );

      // Second message bubble pops in
      if (bubble2) {
        tl.to(
          bubble2,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.05,
            ease: "back.out(1.4)",
          },
          0.14,
        );
      }

      // Hold for reading
      tl.to({}, { duration: 0.07 }, 0.19);

      // Exits upwards
      tl.to(
        card1Ref.current,
        {
          autoAlpha: 0,
          scale: 0.92,
          y: -35,
          duration: 0.05,
          ease: "power2.in",
        },
        0.26,
      );

      // ----------------------------------------------------
      // BEAT 2: CARD 2 (AI / Claude Chat)
      // ----------------------------------------------------
      // Enters
      tl.to(
        card2Ref.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.06,
          ease: "power3.out",
        },
        0.32,
      );

      // Shimmer "Thinking..."
      if (aiThinkingRef.current) {
        tl.to(aiThinkingRef.current, { autoAlpha: 1, duration: 0.03 }, 0.35);
        tl.to(aiThinkingRef.current, { autoAlpha: 0, duration: 0.02 }, 0.40);
      }
      // AI reply pops in
      if (aiReplyTextRef.current) {
        tl.to(aiReplyTextRef.current, { autoAlpha: 1, y: 0, duration: 0.04 }, 0.41);
      }
      // Action icons fade in
      if (aiBottomBarRef.current) {
        tl.to(aiBottomBarRef.current, { autoAlpha: 1, duration: 0.03 }, 0.43);
      }

      // Hold for reading
      tl.to({}, { duration: 0.07 }, 0.46);

      // Exits upwards
      tl.to(
        card2Ref.current,
        {
          autoAlpha: 0,
          scale: 0.92,
          y: -35,
          duration: 0.05,
          ease: "power2.in",
        },
        0.53,
      );

      // ----------------------------------------------------
      // BEAT 3: CARD 3 (VS Code Image)
      // ----------------------------------------------------
      // Enters
      tl.to(
        card3Ref.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.06,
          ease: "power3.out",
        },
        0.59,
      );

      // Hold for reading/viewing code
      tl.to({}, { duration: 0.11 }, 0.65);

      // Exits upwards
      tl.to(
        card3Ref.current,
        {
          autoAlpha: 0,
          scale: 0.92,
          y: -35,
          duration: 0.05,
          ease: "power2.in",
        },
        0.76,
      );

      // ----------------------------------------------------
      // BEAT 4: CARD 4 (Sticky Note Image)
      // ----------------------------------------------------
      // Enters
      tl.to(
        card4Ref.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotation: -3,
          duration: 0.07,
          ease: "back.out(1.4)",
        },
        0.82,
      );

      // Final hold until unpin
      tl.to({}, { duration: 0.11 }, 0.89);
    },
    { scope: wrapperRef },
  );

  return (
    <section className="about-scroll-section" ref={wrapperRef}>
      <div className="about-sticky-container" ref={stickyRef}>
        <div className="container flex flex-col items-center justify-center">
          <h2 className="about-incroy-heading" ref={headingRef}>
            <span className="block">
              {headingLine1.split(" ").map((word, i) => (
                <span key={`h1-${i}`} className="heading-word">
                  {word}&nbsp;
                </span>
              ))}
            </span>
            <span className="block">
              {headingLine2.split(" ").map((word, i) => (
                <span key={`h2-${i}`} className="heading-word">
                  {word}&nbsp;
                </span>
              ))}
            </span>
          </h2>

          <div className="about-cards-row">
            {/* Card 1: WhatsApp Chat Option (Black/Dark Theme) */}
            <div ref={card1Ref} className="about-card about-card-whatsapp">
              <div className="whatsapp-bubble whatsapp-bubble-top">
                <p className="whatsapp-text">
                  Your friend says he knows a guy who builds websites.
                </p>
                <div className="whatsapp-meta">
                  <span className="whatsapp-time">8:20</span>
                </div>
              </div>

              <div className="whatsapp-bubble whatsapp-bubble-bottom">
                <p className="whatsapp-text">
                  Someone else says social media is all you need.
                </p>
                <div className="whatsapp-meta">
                  <span className="whatsapp-time">8:21</span>
                  <svg
                    className="whatsapp-check"
                    viewBox="0 0 17 17"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9.62613 3.84692C9.87357 3.53898 10.3238 3.48942 10.632 3.73657C10.9401 3.98384 10.9902 4.43415 10.7433 4.74243L4.55777 12.4475C4.43055 12.606 4.24213 12.7029 4.03922 12.7141C3.83627 12.7252 3.6381 12.6497 3.49429 12.5061L0.994294 10.0061C0.714773 9.72659 0.713837 9.27295 0.993318 8.9934C1.27278 8.71411 1.72651 8.71417 2.00601 8.9934L3.94156 10.929L9.62613 3.84692ZM13.7121 3.84692C13.9595 3.53876 14.4107 3.48916 14.7189 3.73657C15.0269 3.98391 15.0762 4.43421 14.8293 4.74243L8.64371 12.4475C8.51643 12.606 8.32813 12.703 8.12515 12.7141C7.92216 12.7252 7.72404 12.6498 7.58023 12.5061L6.58023 11.5071C6.30089 11.2277 6.30029 10.774 6.57926 10.4944C6.85866 10.215 7.31239 10.2143 7.59195 10.4934L8.0275 10.928L13.7121 3.84692Z"
                      fill="#53bdeb"
                    />
                  </svg>
                </div>

                <svg
                  className="whatsapp-tail"
                  viewBox="0 0 15 19"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 4L7.5 0L0 0L0 14C3.65938 17.2528 10.6252 17.8604 13.1 17.9739C13.4071 17.988 13.5646 17.6021 13.3479 17.3841C11.7002 15.727 7.5 10.8328 7.5 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Card 2: AI / Claude Chat (Black/Dark Theme) */}
            <div ref={card2Ref} className="about-card about-card-ai">
              <div className="ai-chat-container">
                <div className="ai-user-bubble">
                  <span>Your cousin says you should just use AI.</span>
                </div>

                <div className="ai-reply-block">
                  <div className="ai-header">
                    <svg
                      className="claude-sparkle"
                      viewBox="0 0 15 15"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.82806 9.57254L5.65854 7.98391L5.70594 7.84593L5.65794 7.76914H5.51996L5.04601 7.74034L3.42919 7.69655L2.02715 7.63835L0.668297 7.56516L0.326335 7.49257L0.00537109 7.07021L0.0383674 6.85844L0.326335 6.66586L0.73729 6.70185L1.64799 6.76425L3.01404 6.85844L4.00453 6.91723L5.47256 7.07021H5.70594L5.73833 6.97542L5.65854 6.91723L5.59675 6.85844L4.18331 5.90094L2.65348 4.88826L1.85197 4.30512L1.41881 4.01055L1.19984 3.73339L1.10505 3.12865L1.49861 2.6955L2.02655 2.7315L2.16093 2.76809L2.69667 3.17965L3.84015 4.06515L5.33398 5.16483L5.55235 5.34721L5.63995 5.28481L5.65074 5.24162L5.55235 5.07724L4.74005 3.6098L3.87314 2.11596L3.48678 1.49683L3.3848 1.12547C3.34632 0.982781 3.32557 0.835891 3.323 0.688124L3.77175 0.0797911L4.01953 0L4.61646 0.0803911L4.86843 0.298767L5.23979 1.14767L5.84032 2.48372L6.77322 4.30152L7.04619 4.84026L7.19197 5.33941L7.24597 5.49239H7.34136V5.4054L7.41755 4.38191L7.55973 3.12505L7.69772 1.50823L7.74571 1.05228L7.97129 0.506344L8.41944 0.211177L8.7692 0.379158L9.05717 0.790112L9.01697 1.05648L8.84539 2.16696L8.51063 3.90857L8.29165 5.07364H8.41944L8.56522 4.92845L9.15495 4.14494L10.146 2.90668L10.5828 2.41473L11.0927 1.87239L11.4209 1.61382H12.04L12.4954 2.29115L12.2914 2.99067L11.6537 3.79878L11.1257 4.4839L10.368 5.50379L9.89407 6.3197L9.93847 6.38569L10.0513 6.37369L11.7629 6.01013L12.688 5.84215L13.7918 5.65317L14.291 5.88595L14.345 6.12292L14.1488 6.60707L12.9687 6.89863L11.5847 7.1758L9.52331 7.66355L9.49752 7.68155L9.52691 7.71814L10.4556 7.80573L10.8528 7.82733H11.8247L13.6353 7.96232L14.1092 8.27548L14.393 8.65824L14.345 8.94921L13.6173 9.32116L12.6334 9.08779L10.3386 8.54185L9.55271 8.34447H9.44292V8.41047L10.0986 9.05119L11.3003 10.1371L12.8049 11.5349L12.8811 11.8817L12.6886 12.1546L12.4846 12.1253L11.1623 11.1312L10.6524 10.683L9.49752 9.71112H9.42132V9.81311L9.68709 10.2025L11.0927 12.3148L11.1659 12.9628L11.0639 13.1745L10.6998 13.3023L10.299 13.2291L9.47592 12.0749L8.62701 10.7742L7.94249 9.60853L7.8585 9.65653L7.45414 14.0084L7.26456 14.2304L6.82781 14.3984L6.46365 14.1218L6.27047 13.6737L6.46365 12.7882L6.69643 11.6339L6.88601 10.716L7.05699 9.57614L7.15898 9.19698L7.15178 9.17178L7.06779 9.18258L6.20868 10.3626L4.90083 12.1295L3.86654 13.2363L3.61877 13.3347L3.18922 13.1127L3.22881 12.7156L3.46939 12.3622L4.90083 10.5408L5.76413 9.41175L6.32147 8.76023L6.31787 8.66544H6.28487L2.4825 11.1348L1.80457 11.2224L1.5136 10.9488L1.5496 10.5012L1.68818 10.3554L2.83226 9.56834L2.82806 9.57254Z"
                        fill="#D97757"
                      />
                    </svg>
                    <span ref={aiThinkingRef} className="ai-thinking-text">
                      Thinking…
                    </span>
                  </div>
                  <p ref={aiReplyTextRef} className="ai-reply-text">
                    goooood luck with that
                  </p>
                </div>

                <div ref={aiBottomBarRef} className="ai-bottom-bar">
                  <div className="ai-action-icons">
                    <button
                      type="button"
                      aria-label="Copy"
                      className="ai-icon-btn"
                    >
                      <FiCopy size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label="Like"
                      className="ai-icon-btn"
                    >
                      <FiThumbsUp size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label="Dislike"
                      className="ai-icon-btn"
                    >
                      <FiThumbsDown size={13} />
                    </button>
                    <button
                      type="button"
                      aria-label="Retry"
                      className="ai-icon-btn"
                    >
                      <FiRotateCw size={13} />
                    </button>
                  </div>
                  <span className="ai-timestamp">Just now</span>
                </div>
              </div>
            </div>

            {/* Card 3: VS Code Actual Image */}
            <div ref={card3Ref} className="about-card about-card-vscode">
              <Image
                src="/vs-code.png"
                alt="VS Code Window"
                width={1500}
                height={1058}
                className="vscode-img"
                priority
              />
            </div>

            {/* Card 4: Sticky Note Actual Image */}
            <div ref={card4Ref} className="about-card about-card-stickynote">
              <Image
                src="/sticky-note.png"
                alt="Sticky Note"
                width={1500}
                height={1500}
                className="stickynote-img"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
