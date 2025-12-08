import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import "./Styles.css";

// 1. Define the shape of your props
interface MainButtonProps {
  label: string;
  href?: string;
  variant?: string; // You could also specify exact strings like 'primary' | 'secondary'
  size?: string;
  className?: string;
  showArrow?: boolean;
}

const MainButton = ({ 
  label, 
  href = "#", 
  variant = "primary", 
  size = "md", 
  className = "", 
  showArrow = true 
}: MainButtonProps) => { // 2. Apply the interface here
  return (
    <Link href={href} className={`main-btn ${variant} ${size} ${className}`}>
      {/* We add data-text attribute here so CSS can access it 
         for the duplicate scrolling effect 
      */}
      <span className="label" data-text={label}>
        <span>{label}</span>
      </span>
      
      {showArrow && <GoArrowUpRight className="arrow-icon" />}
    </Link>
  );
};

export default MainButton;