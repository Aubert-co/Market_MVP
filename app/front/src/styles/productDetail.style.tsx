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
  margin: 20px 0;
  padding: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

.description-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #333;
  font-size: 15px;
}

.description-content p {
  margin: 0;
  word-wrap: break-word;
}


.message_success,
.message_error,
.message_info {
  position: fixed;
  top: 20px;  
  right: 20px;
  padding: 12px 18px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999; 
  animation: fadeIn 0.3s ease-out;
}


.message_success {
  background-color: #4caf50; 
}

.message_error {
  background-color: #f44336; 
}

.message_info {
  background-color: #2196f3; 
}


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