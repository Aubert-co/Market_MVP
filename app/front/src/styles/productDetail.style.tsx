import styled from "styled-components";

export const ProductStyle = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  min-heigth:auto;
  

 .product-detail {
    display: flex;
    flex-direction:row;
    background-color:#f5a623;
    max-width:900px;
    width: 60%;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    gap: 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }
  .product-infos .name{
    text-align:center;
  }
  .product-image{
    min-height:400px;
    min-width:50%;
  
  }
  .product-image img{
    height:100%;
    width:100%;
  
  }
  .actions ,.product-stocks{
    display:flex;
    flex-direction:column;
   
  }
.product-infos{
  display:flex;
  flex-direction:column;
  width:100%;
  
  
}
  @media (max-width: 700px) {
   .product-detail{
      display:flex;
      flex-direction:column;
      width:80%;
   }
  }
 
 
 

  .desctipions {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9; /* fundo leve */
  border: 1px solid #e5e7eb; /* borda suave */
  border-radius: 8px;
}

.desctipions p {
  font-size: 1rem;
  line-height: 1.6;
  color: #333; /* texto preto claro */
  margin: 0;
  white-space: pre-line; /* mantém quebras de linha se houver */
}

.message_success,
.message_error,
.message_info {
  position: fixed;
  top: 20px;  /* distância do topo */
  right: 20px; /* distância da direita */
  padding: 12px 18px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* fica acima de tudo */
  animation: fadeIn 0.3s ease-out;
}

/* estilos diferentes por tipo */
.message_success {
  background-color: #4caf50; /* verde */
}

.message_error {
  background-color: #f44336; /* vermelho */
}

.message_info {
  background-color: #2196f3; /* azul */
}

/* animação suave de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export const CommentsStyle = styled.div` 
 
    width: 90%;
    max-width: 700px;
    margin-top: 24px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    justify-self:center;

  .comments h3 {
    margin-bottom: 16px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
  }

  .comment-item {
    padding: 14px 0;
    border-bottom: 1px solid #ddd;
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-content {
    font-size: 1rem;
    color: #444;
    margin-bottom: 6px;
  }

  .comment-author {
    font-size: 0.9rem;
    color: #777;
    font-style: italic;
  }
`