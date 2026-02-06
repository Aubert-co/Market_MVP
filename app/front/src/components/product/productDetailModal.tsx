import type { Product } from "@/types/products.types";

import { loadImage } from "@/utils";

type ProductDetailsProps = {
  products: Product[];
  showEditModal:(product:Product)=>void
};

export const ProductDetailModal = ({ products ,showEditModal}: ProductDetailsProps) => {
  
  return (
    <>
      {products.map(product => (
        <div key={product.id} className="product-modal">
        <div className="image">
            <img src={loadImage(product.imageUrl)} alt={product.name} />
        </div>

        <div className="content">
            <h2 className="title">{product.name}</h2>

            <p className="description">{product.description}</p>

            <div className="meta">
            <span>ID: {product.id}</span>
            <span>Estoque: {product.stock}</span>
            </div>

            <div className="price">
            R$ {product.price}
            </div>

            <div className="actions">
            <button className="edit" onClick={()=>showEditModal(product)}>
                Editar
            </button>

            <button
                className="disable"
            >
                Desativar
            </button>
            </div>
        </div>
        </div>

      ))}
    </>
  );
};
