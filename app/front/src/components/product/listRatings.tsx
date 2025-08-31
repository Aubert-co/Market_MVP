import { Rating } from "../ratings";

type Props = {
  ratings: {
    _avg: {
      rating?: number;
    };
    _count: {
      rating: number;
    };
  };
};
export const ListRatings = ({ ratings }:Props) => {
  const average = ratings._avg.rating ?? 0;
  const total = ratings._count.rating;

  return (
    <div className="rating">
      <Rating value={average} text={`avaliações ${total}`}/>
   
    </div>
  );
};