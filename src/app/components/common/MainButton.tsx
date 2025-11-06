import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import "./Styles.css";

const MainButton = ({ label, href = "#", variant = "primary", size = "md", className = "",showArrow = true, }) => {
  return (
    <Link href={href} className={`main-btn ${variant} ${size} ${className}`}>
      <span className="label">{label}</span>
      {showArrow && <GoArrowUpRight  className="arrow-icon" />}
    </Link>
  );
};

export default MainButton;
