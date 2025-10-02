import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./register"

import { Login } from "./login"
import { Index } from "."
import { ProductDetail } from "./productDetail"
import { Profile } from "./profile"
import { CreateStore } from "./storeDashboard/createStore"
import { StoreAdminDash } from "./storeDashboard/storeDashboard"
import { StoreProducts } from "./storeDashboard/storeProducts"
import { StoreCoupons } from "./storeDashboard/storeCoupons"
import { StoreOrders } from "./storeDashboard/storeOrders"
import { Coupon } from "./coupon"
import { NotFound } from "./not_found"

export const App = ()=>{
    return(
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Index/>}/>
                <Route path="/perfil/:action" element={<Profile/>}/>
                <Route path="/produto/:productid" element={<ProductDetail/>}/>
                <Route path="/abrir-loja" element={<CreateStore/>}/>
                <Route path="/loja" element={<StoreAdminDash/>}/>
                <Route path="/loja/produtos" element={<StoreProducts/>}/>
                <Route path="/loja/cupons" element={<StoreCoupons/>}/>
                <Route path="/loja/pedidos" element={<StoreOrders/>}/>
                <Route path="/cupons" element={<Coupon/>} />
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    </Router>
  
    )
}