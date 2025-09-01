import { BrowserRouter as Router ,Routes,Route} from "react-router-dom"
import { Register } from "./register"

import { Login } from "./login"
import { Index } from "."
import { ProductDetail } from "./productDetail"
import { Profile } from "./profile"



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
            </Route>
        </Routes>
    </Router>
  
    )
}