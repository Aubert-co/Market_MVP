import { useNavigate, useParams } from "react-router-dom";
import orderhistory from '@/assets/orderhistory.png'
import couponImg from '@/assets/coupon.png'
import cartImg from '@/assets/cart.png'
import storeImg from '@/assets/store2.png'
import { UserCoupons } from "@/components/profile/userCoupons";
import { Cart } from "@/components/profile/userCart";
import { UserStore } from "@/components/profile/userStore";
import { useEffect, useRef } from "react";
import { Container } from "@/components/layouts/container"
import { ProfileStyle } from "@/styles/profile.style";
import { UserOrdersComponent } from "@/components/profile/userOrders";
import { useBoxMessage } from "@/hooks/useBoxMessages";
import { useSyncCart } from "@/hooks/useSyncCart";

export const Profile = () => {
  const redirect = useNavigate()
  const {action} = useParams()
  const goToForm = useRef<HTMLInputElement>(null)
  const {BoxMessage,setMessage} = useBoxMessage({styledType:"toast"})
  useSyncCart()
  const scrollToForm = () => {
    if (goToForm.current) {
      goToForm.current.scrollIntoView({
        behavior: 'smooth',
        block:"nearest"
      });
    }
  };

  useEffect(() => {
   
    const timeout = setTimeout(() => {
    if (action && goToForm.current) {
      goToForm.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); 

    return () => clearTimeout(timeout);
  }, [action]);
  
  const onChangeActions = (page:string)=>{
    redirect(`/perfil/${page}`)
    scrollToForm()
  }
  return (
    <Container>
        <BoxMessage/>
        <ProfileStyle>
          <h1 style={{ color: '#4B5563' }}>Perfil</h1>
          <div className="boxes">
            <div className="box" onClick={() => redirect('/perfil/ordens')}>
              <img src={orderhistory} alt="Ícone de histórico de compras" />
              <p>Histórico de Compras</p>
            </div>

            <div className="box" onClick={() => onChangeActions('cupons')}>
              <img src={couponImg} alt="Ícone de histórico de compras" />
              <p>Meus cupons</p>
            </div>

            <div className="box" onClick={() => onChangeActions('carrinho')}>
              <img src={cartImg} alt="Ícone de histórico de compras" />
              <p>Meu carrinho</p>
            </div>
            <div className="box" onClick={() => onChangeActions('loja')}>
              <img src={storeImg} alt="Ícone de histórico de compras" />
              <p>Minha loja</p>
            </div>
            
          </div>
  
        </ProfileStyle>
      {action === "ordens" && <UserOrdersComponent />}
      {action ==="carrinho" && <Cart setMessage={setMessage} formRef={goToForm}/>}
      {action === "cupons" && <UserCoupons formRef={goToForm} />}
      {action === "loja"  && <UserStore formRef={goToForm}/>}
    </Container>
  );
};
 








