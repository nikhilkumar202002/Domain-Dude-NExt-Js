"use client"

import Image from "next/image";
import "./Styles.css";
import advertoLogo from "../../../assets/client-logos/ADVERTO.png";
import arjunAssociatesLogo from "../../../assets/client-logos/ARJUN-ASSOCITES.png";
import asfarLaundryLogo from "../../../assets/client-logos/asfar-laundry.png";
import ayshaKartLogo from "../../../assets/client-logos/AYSHAKART.png";
import ayurSidhiLogo from "../../../assets/client-logos/AYURSIDHI.png";
import bestOutfitsLogo from "../../../assets/client-logos/best-outfits-for-men-Rixo_Logo_1.png";
import bridgateLogo from "../../../assets/client-logos/Bridgate-Logo-Colour.png";
import dimoisLogo from "../../../assets/client-logos/Dimois single logo illust trasparant.png";
import eduPlanLogo from "../../../assets/client-logos/EduPlan_Logo.png";
import fastInternationalLogo from "../../../assets/client-logos/FAST-INTERNATIONAL.png";
import fcbLogo from "../../../assets/client-logos/FCB.png";
import future360Logo from "../../../assets/client-logos/future-360.png";
import gulfCargoLogo from "../../../assets/client-logos/GULF-CARGO.png";
import herbureLogo from "../../../assets/client-logos/HERBURE.png";
import infobyteLogo from "../../../assets/client-logos/INFOBYTE.png";
import kaylaBeautyLogo from "../../../assets/client-logos/kayla-beuty.png";
import kjMainLogo from "../../../assets/client-logos/kj-logo-main.png";
import kuberaLogo from "../../../assets/client-logos/KUBERA.png";
import mainLogo from "../../../assets/client-logos/MAIN-LOGO.png";
import metaArkLogo from "../../../assets/client-logos/META-ARK.png";
import mihfaLogo from "../../../assets/client-logos/MIHFA.png";
import mitvNewsLogo from "../../../assets/client-logos/MITV-NEWS.png";
import mtNewsLogo from "../../../assets/client-logos/MT-NEWS.png";
import nirthanjaliLogo from "../../../assets/client-logos/nirthanjali.png";
import pantryLogo from "../../../assets/client-logos/pantry.png";
import planPediaLogo from "../../../assets/client-logos/PLAN-PEDIA.png";
import ruknAlkavangeLogo from "../../../assets/client-logos/RUKN-ALKAVANGE.png";
import rysaClinicLogo from "../../../assets/client-logos/rysa.png";
import simqoLogo from "../../../assets/client-logos/simqo.png";
import skywayLogo from "../../../assets/client-logos/skyway-mainlogo.png";
import starSportsLogo from "../../../assets/client-logos/starsports.png";
import suncladLogo from "../../../assets/client-logos/sunclad.png";
import taBrandingLogo from "../../../assets/client-logos/TA_Branding-1.png";
import todaysSmileLogo from "../../../assets/client-logos/todays-smile.png";
import vatcomLogo from "../../../assets/client-logos/VATCOM-LOGO.png";
import vibhaBharathLogo from "../../../assets/client-logos/vibha-bharath.png";
import yanaLogo from "../../../assets/client-logos/Yana-logo.png";

const clients = [
  { name: "Adverto", logo: advertoLogo },
  { name: "TA Branding", logo: taBrandingLogo },
  { name: "Arjun Associates", logo: arjunAssociatesLogo },
  { name: "Asfar Laundry", logo: asfarLaundryLogo },
  { name: "Edu Plan", logo: eduPlanLogo },
  { name: "Gulf Cargo", logo: gulfCargoLogo },
  { name: "RYSA", logo: rysaClinicLogo },
  { name: "Aysha Kart", logo: ayshaKartLogo },
  { name: "Ayur Sidhi", logo: ayurSidhiLogo },
  { name: "Best Outfits For Men", logo: bestOutfitsLogo },
  { name: "Bridgate", logo: bridgateLogo },
  { name: "Dimois", logo: dimoisLogo },
  { name: "Fast International", logo: fastInternationalLogo },
  { name: "FCB", logo: fcbLogo },
  { name: "Future 360", logo: future360Logo },
  { name: "Herbure", logo: herbureLogo },
  { name: "Infobyte", logo: infobyteLogo },
  { name: "Kayla Beauty", logo: kaylaBeautyLogo },
  { name: "KJ", logo: kjMainLogo },
  { name: "Kubera", logo: kuberaLogo },
  { name: "Main Logo", logo: mainLogo },
  { name: "Meta Ark", logo: metaArkLogo },
  { name: "Mihfa", logo: mihfaLogo },
  { name: "MITV News", logo: mitvNewsLogo },
  { name: "MT News", logo: mtNewsLogo },
  { name: "Nirthanjali", logo: nirthanjaliLogo },
  { name: "Pantry", logo: pantryLogo },
  { name: "Plan Pedia", logo: planPediaLogo },
  { name: "Rukn Alkavange", logo: ruknAlkavangeLogo },
  { name: "Simqo", logo: simqoLogo },
  { name: "Skyway", logo: skywayLogo },
  { name: "Star Sports", logo: starSportsLogo },
  { name: "Sunclad", logo: suncladLogo },
  { name: "Today's Smile", logo: todaysSmileLogo },
  { name: "VATCOM", logo: vatcomLogo },
  { name: "Vibha Bharath", logo: vibhaBharathLogo },
  { name: "Yana", logo: yanaLogo },
];

const ClientList = () => {
  return (
    <section className="client-list-section" aria-labelledby="client-list-title">
      <div className="container client-list-heading">
        <h2 id="client-list-title">Our Clients</h2>
        <p>Trusted by ambitious brands</p>
      </div>

      <div className="container">
        <div className="client-logo-grid">
          {clients.map((client) => (
            <div className="client-logo-card" key={client.name}>
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={180}
                height={90}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientList;
