import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./register"
import { Login } from "./login"
import { Index } from "."
import { ProductDetail } from "./productDetail"
import { Profile } from "./profile"
import { CreateStore } from "./store/createStore"
import { StoreHome } from "./store/storeHome"
import { StoreProducts } from "./store/storeProducts"
import { StoreCoupons } from "./store/storeCoupons"
import { StoreOrders } from "./store/storeOrders"
import { Coupon } from "./coupon"
import { NotFound } from "./not_found"
import { Search } from "./search"
import { Checkout } from "./checkout"
import { ProtectedStoreRoutes } from "@/components/store/protectedStoreRoute"
export const App = ()=>{
    return(
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Index/>}/>
                <Route path="/produtos/pagina/:page" element={<Index/>}/>
                <Route path="/perfil/:action" element={<Profile/>}/>
                <Route path="/produto/:productid" element={<ProductDetail/>}/>
                <Route path="/abrir-loja" element={<CreateStore/>}/>
                <Route path="/cupons" element={<Coupon/>} />
                <Route path="*" element={<NotFound/>}/>
                <Route path="/buscas/*" element={<Search/>}/>
                <Route path="/pagamento" element={<Checkout/>}/>
                
                <Route element={<ProtectedStoreRoutes/>}>
                    <Route path="/loja" element={<StoreHome/>}/>
                    <Route path="/loja/produtos" element={<StoreProducts/>}/>
                    <Route path="/loja/cupons" element={<StoreCoupons/>}/>
                    <Route path="/loja/pedidos" element={<StoreOrders/>}/>
                </Route>
           
            </Route>
        </Routes>
    </Router>
  
    )
}