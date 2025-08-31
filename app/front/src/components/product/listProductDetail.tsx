import { loadImage } from "@/services";
import type { Product } from "@/types/products.types";
import { ListRatings } from "./listRatings";
import { Collapse } from "../collapse";
import { StyleBtn } from "@/styles/forms";
import type { Message } from "../boxMessages";

type Props = {
    product:Product[],
    ratings: {
    _avg: {
      rating?: number;
    };
    _count: {
      rating: number;
    };
  };
 setMessage: React.Dispatch<React.SetStateAction<Message>>
}
export const ListProductDetail = ({product,ratings,setMessage}:Props)=>{
    const addToCart  =()=>{
        setMessage({content:'Adicionado ao carrinho com sucesso',type:'success'})
    }
    return product.map((val)=>{
        return (
            <>
            <div key={val.id} data-testid="product-detail" className="product-detail">
                <div className="product-image">
                    <img src={loadImage(val.imageUrl)}/>
                </div>
                
                <div className="product-infos">
                     <div className="name">
                        <h2>{val.name}</h2>
                    </div>
                    <div className="ratings">
                        <ListRatings ratings={ratings}/>
                    </div>
                    <div className="product-stocks">
                        <p>Em estoque {val.stock}</p>
                        <h3>Preço ${val.price}</h3>
                    </div>
                    <div className="actions">
                        <StyleBtn onClick={addToCart}>Adicionar ao carrinho</StyleBtn>
                        <StyleBtn>Comprar</StyleBtn>
                    </div>
                </div>
            </div>
            <Collapse  title="Descrição">
                <div className="desctipions"> 
                    <p> {val.description }</p>
                </div>
            </Collapse>
        </>
        )
        })
    
}