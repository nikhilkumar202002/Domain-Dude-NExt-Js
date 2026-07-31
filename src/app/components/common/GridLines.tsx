import type { CSSProperties } from "react";
import styles from "./GridLines.module.css";

type GridLinesProps = {
  className?: string;
  lineCount?: number;
  color?: string;
  opacity?: number;
  maxWidth?: string;
};

type GridLinesStyle = CSSProperties & {
  "--grid-line-color": string;
  "--grid-line-opacity": number;
  "--grid-max-width": string;
};

/**
 * A decorative set of vertical guide lines.
 *
 * Render it inside a positioned section. The component fills that section and
 * ignores pointer events, so it never interferes with the section content.
 */
const GridLines = ({
  className = "",
  lineCount = 5,
  color = "#ffffff",
  opacity = 0.12,
  maxWidth = "1440px",
}: GridLinesProps) => {
  const safeLineCount = Math.max(2, Math.floor(lineCount));
  const style: GridLinesStyle = {
    "--grid-line-color": color,
    "--grid-line-opacity": opacity,
    "--grid-max-width": maxWidth,
  };

  return (
    <div
      className={`${styles.gridLines} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {Array.from({ length: safeLineCount }, (_, index) => (
        <span className={styles.line} key={index} />
      ))}
    </div>
  );
};

export default GridLines;
