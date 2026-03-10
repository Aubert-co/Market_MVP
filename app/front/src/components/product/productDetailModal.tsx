import type { Product } from "@/types/products.types";
import { loadImage } from "@/utils";

import { ButtonsDiv, PrimaryButton } from "@/styles/shared.style";

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

            <ButtonsDiv>
              <PrimaryButton
                onClick={() => showEditModal(product)}
                aria-label={`Editar produto ${product.name}`}
              >
                Editar
              </PrimaryButton>

              <PrimaryButton
                $bg="#FF6B6B"
                $hoverBg="#FF4C4C"
                $color="#fff"
                aria-label={`Desativar produto ${product.name}`}
              >
                Desativar
              </PrimaryButton>
            </ButtonsDiv>
        </div>
        </div>

      ))}
    </>
  );
};
