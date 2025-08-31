import { CommentsStyle } from "@/styles/productDetail.style";
import type { Comments,Reviews } from "@/types/productDetail.types";
import { Rating } from "../ratings";

type Props = {
  comments: Comments[];
  reviews:Reviews[]
};

export const ListComments = ({ comments ,reviews}: Props) => {
  if(comments.length ===0)return <p>Nenhum comentário disponível</p>
  
  return (
    <CommentsStyle data-testid="comments">
      {comments.map((comment, index) => (
        <div key={index}>
          <div >{comment.name[0] + "*".repeat(comment.name.length - 1)}</div>
          <div>
            <Rating max={5} value={reviews[index].rating}/>
          </div>
          <div >{comment.content}</div>
        </div>
      ))}
    </CommentsStyle>
  )
}