import { ReactNode } from "react";
import "./index.css";

interface CardData {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = ({ children, className, onClick }: CardData) => {
  return (
    <article className={`card ${className}`} onClick={onClick}>
      {children}
    </article>
  );
};

export default Card;
