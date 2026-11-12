export interface NavItem {
  id: string;
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ServiceItem {
  id: number;
  title: string;
  href: string;
  keyPoints: string[];
}

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  platform: "instagram" | "linkedin" | "twitter" | "facebook";
}

export const navItems: NavItem[] = [
  { id: "home", name: "Home", href: "/" },
  { id: "about", name: "About", href: "/about" },
  { id: "services", name: "Services", href: "/our-services", hasDropdown: true },
  { id: "works", name: "Works", href: "/works" },
  { id: "industry", name: "Industry", href: "/industry" },
  { id: "insights", name: "Insights", href: "/insights" },
  { id: "contact", name: "Contact", href: "/contact-us" },
];

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Web Development",
    href: "/our-services/web-development",
    keyPoints: [
      "Custom website development services",
      "Responsive web design for businesses",
      "SEO-friendly website development",
      "React and Next.js web development",
      "WordPress business website development",
    ],
  },
  {
    id: 2,
    title: "UI/UX Designing",
    href: "/our-services/ui-ux-design",
    keyPoints: [
      "Professional UI UX design services",
      "User experience design for websites",
      "Mobile app UI UX design",
      "Conversion-focused interface design",
      "Product and web app UX design",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing",
    href: "/our-services/digital-marketing",
    keyPoints: [
      "Digital marketing services for brands",
      "Social media marketing and management",
      "Google Ads PPC campaign management",
      "Performance marketing for lead generation",
      "Content marketing and email campaigns",
    ],
  },
  {
    id: 4,
    title: "Branding",
    href: "/our-services/branding-visual",
    keyPoints: [
      "Brand identity and logo design",
      "Brand strategy and positioning",
      "Rebranding services for businesses",
      "Visual identity design for brands",
      "Brand voice and messaging development",
    ],
  },
  {
    id: 5,
    title: "Video Production",
    href: "/our-services/video-production",
    keyPoints: [
      "Video production services for brands",
      "Social media reels and ad videos",
      "Product explainer video production",
      "Corporate and brand film production",
      "Motion graphics and animation videos",
    ],
  },
  {
    id: 6,
    title: "Graphics Designing",
    href: "/our-services/graphics-designing",
    keyPoints: [
      "Graphic design services for businesses",
      "Social media creative design",
      "Marketing poster and banner design",
      "Branding and print design services",
      "Pitch deck and presentation design",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { id: "instagram", name: "Instagram", href: "#", platform: "instagram" },
  { id: "linkedin", name: "LinkedIn", href: "#", platform: "linkedin" },
  { id: "twitter", name: "Twitter", href: "#", platform: "twitter" },
  { id: "facebook", name: "Facebook", href: "#", platform: "facebook" },
];

export default navItems;
