import { Link } from "react-router-dom"
import type { Product } from "../../types/products.types"
import { loadImage } from "../../services"
import { useEffect, useState } from "react"
import { ProductSkeleton } from "./boxProductSkeleton"


type ListType = 'Product' | 'Cart'

type Props = {
    products:Product[],
    listType:ListType
}
export const RenderPrice = (params:{type:ListType,price:number})=> 
    params.type === "Product" &&
    <p className="item_price" >R${params.price}</p>;



export const ListProducts = ({ products, listType }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ( products.length > 0) {
      setLoading( false )
    }
  }, [products]);

  if(loading)return <ProductSkeleton className="product" length={8}/>
  return (
    <>
      {
       products.map(({ id, name, imageUrl, price }: any) => (
            <Link
              to={`/product/${id}`}
              key={id}
              className="product"
              data-testid="product"
            >
              <div className="img">
                <img alt={name} src={imageUrl} />
              </div>
             <RenderPrice price={price} type={listType}/>
              <p className="item_name">{name}</p>
            </Link>
          ))}
    </>
  );
};