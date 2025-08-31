import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";

type RatingProps = {
  value: number;
  max?: number;
  text?:string;
};

const RatingStyle = styled.div` 
  
    display: flex;
  align-items: center;
  gap: 4px;

  svg {
    color: #facc15; 
    font-size: 1.2rem;
  }

  .rating-text {
    margin-left: 6px;
    font-size: 0.95rem;
    color: #111827;
  }
`
export const Rating = ({ value, max = 5 ,text}: RatingProps) => {
  return (
    <RatingStyle data-testid="rating">
     
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        if (value >= starValue) {
          return <FaStar data-testid="star" key={i} />;
        } else if (value >= starValue - 0.5) {
          return <FaStarHalfAlt data-testid="halfstar" key={i} />;
        } else {
          return <FaRegStar data-testid="regstar" key={i} />;
        }
      })}
       {text && <p data-testid="rating-text" className="rating-text">{text}</p>}
    </RatingStyle>
  );
};
