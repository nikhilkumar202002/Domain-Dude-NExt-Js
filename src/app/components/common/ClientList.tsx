"use client"

import Image from "next/image";
import "./Styles.css";
import advertoLogo from "../../../assets/client-logos/ADVERTO.png";
import arjunAssociatesLogo from "../../../assets/client-logos/ARJUN-ASSOCITES.png";
import ayshaKartLogo from "../../../assets/client-logos/AYSHAKART.png";
import ayurSidhiLogo from "../../../assets/client-logos/AYURSIDHI.png";
import fastInternationalLogo from "../../../assets/client-logos/FAST-INTERNATIONAL.png";
import fcbLogo from "../../../assets/client-logos/FCB.png";
import gulfCargoLogo from "../../../assets/client-logos/GULF-CARGO.png";
import herbureLogo from "../../../assets/client-logos/HERBURE.png";
import infobyteLogo from "../../../assets/client-logos/INFOBYTE.png";
import kuberaLogo from "../../../assets/client-logos/KUBERA.png";
import metaArkLogo from "../../../assets/client-logos/META-ARK.png";
import mihfaLogo from "../../../assets/client-logos/MIHFA.png";
import mitvNewsLogo from "../../../assets/client-logos/MITV-NEWS.png";
import mtNewsLogo from "../../../assets/client-logos/MT-NEWS.png";
import planPediaLogo from "../../../assets/client-logos/PLAN-PEDIA.png";
import ruknAlkavangeLogo from "../../../assets/client-logos/RUKN-ALKAVANGE.png";
import rysaClinicLogo from "../../../assets/client-logos/rysa.png";

const clients = [
  { name: "Adverto", logo: advertoLogo },
  { name: "Arjun Associates", logo: arjunAssociatesLogo },
  { name: "Aysha Kart", logo: ayshaKartLogo },
  { name: "Ayur Sidhi", logo: ayurSidhiLogo },
  { name: "Fast International", logo: fastInternationalLogo },
  { name: "FCB", logo: fcbLogo },
  { name: "Gulf Cargo", logo: gulfCargoLogo },
  { name: "Herbure", logo: herbureLogo },
  { name: "Infobyte", logo: infobyteLogo },
  { name: "Kubera", logo: kuberaLogo },
  { name: "Meta Ark", logo: metaArkLogo },
  { name: "Mihfa", logo: mihfaLogo },
  { name: "MITV News", logo: mitvNewsLogo },
  { name: "MT News", logo: mtNewsLogo },
  { name: "Plan Pedia", logo: planPediaLogo },
  { name: "Rukn Alkavange", logo: ruknAlkavangeLogo },
  { name: "RYSA", logo: rysaClinicLogo },
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
