import styled from "styled-components"


export const ProductsCheckout = styled.div`

box-sizing: border-box;
justify-content:center;
align-items:center;
display:flex;
flex-direction:column;
.list-buy{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  align-items:center;
  max-width:100%;
  gap:10px

}
.overview {
  background: #1e2738;
  color: #fff;
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  transition: background 0.3s ease;
}

.overview:hover {
  background: #252f42;
}
`

export const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #636870ff;
  color: #fff;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  margin: 12px; 

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
  }

  .item-image {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 8px;
   
  }
  .item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align:center;
  }

  .item-name {
    font-size: 1rem;
    font-weight: 600;
    white-space: wrap;       
    overflow: hidden;          
    text-overflow: ellipsis;   
    max-width: 250px;      
  }

  

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
   
  }
.checkout-actions{
  display:flex;
  flex-direction:column;
  gap:10px;

  button{
    width:100%;
  }
}
  .item-price {
    font-weight: bold;
    font-size: 1rem;
    min-width: 100px;
    text-align: right;
  }


  @media (max-width: 768px) {
    flex-direction:column;
    width:90%;
   .item-content{
      flex-direction:column;
    
      text-align:center;
    }
  
    
  }
`;

export const CouponContainer = styled.div`
  background: #1e2738; 
  color: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width:50%;
  justify-contenr:center;
  select {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #444;
    background: #2a3448; 
    color: #fff;
    font-size: 0.95rem;
    outline: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #35425a; 
    }
  }

  label {
    font-weight: 600;
    margin-bottom: 6px;
    color: #f0f0f0; 
  }
`;