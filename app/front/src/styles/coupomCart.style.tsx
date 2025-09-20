import styled from "styled-components";
export const CouponCard = styled.div`
 text-align: center;
box-sizing: border-box;


.coupon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  align-items:center;
  max-width:100%;
}
.coupon-item{
  margin: 10px;
  width: 300px;         
  min-width: 250px;     
  flex-shrink: 0;        
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: start;
  background-color: #fff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s, box-shadow 0.3s;
}

.coupon-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  
}
.coupon-details{
  display:flex;
  flex-direction:column;
  justify-content:center;
  
}
  
button {
  background: linear-gradient(135deg, #ff4d4d, #ff6b6b);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
  margin-top:1%;
}

button:hover {
  background: linear-gradient(135deg, #ff3333, #ff5050);
  box-shadow: 0 6px 14px rgba(255, 77, 77, 0.4);
  transform: translateY(-2px);
}

button:active {
  transform: scale(0.97);
  box-shadow: 0 3px 8px rgba(255, 77, 77, 0.3);
}

`;