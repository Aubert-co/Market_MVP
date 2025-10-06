import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


export const PromoContainer = styled.div`
display: flex;
justify-content: space-between;
gap: 10px;
padding: 20px;
;
cursor:pointer;
.promo-box {
  flex: 1;
  padding: 15px;
  background-color: #ff6347;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.promo-box h2 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #ffffff;
}

.promo-box p {
  font-size: 14px;
  color: #ffffff;
}

`



export const PromoBox = ()=> {
  const navigate = useNavigate();

  return (
    <PromoContainer >
         <div className="promo-box" onClick={()=>navigate('/cupons')}>
            <h2>Dezenas de Cupons</h2>
            <p>Pegue agora seu cupom!</p>
        </div>
        <div className="promo-box">
            <h2>Ofertas Especiais</h2>
            <p>Aplicando cupons exclusivos em produtos selecionados</p>

        </div>
    </PromoContainer>
  );
}