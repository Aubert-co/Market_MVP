import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./register"

import { Login } from "./login"
import { Index } from "."
import { ProductDetail } from "./productDetail"
import { Profile } from "./profile"
import { CreateStore } from "./createStore"
import { AdminStore } from "./admStore"
import { StoreProducts } from "./storeProducts"
import { StoreCoupons } from "./storeCoupons"


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
                <Route path="loja/cupons" element={<StoreCoupons/>}/>
            </Route>
        </Routes>
    </Router>
  
    )
}