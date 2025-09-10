import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./register"

import { Login } from "./login"
import { Index } from "."
import { ProductDetail } from "./productDetail"
import { Profile } from "./profile"
import { CreateStore } from "./storeAdmin/createStore"
import { AdminStore } from "./storeAdmin/admStore"
import { StoreProducts } from "./storeAdmin/storeProducts"
import { StoreCoupons } from "./storeAdmin/storeCoupons"
import { StoreOrders } from "./storeAdmin/storeOrders"

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
                <Route path="/loja" element={<AdminStore/>}/>
                <Route path="/loja/produtos" element={<StoreProducts/>}/>
                <Route path="/loja/cupons" element={<StoreCoupons/>}/>
                <Route path="/loja/pedidos" element={<StoreOrders/>}/>
            </Route>
        </Routes>
    </Router>
  
    )
}