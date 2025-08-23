import { BrowserRouter as Router ,Routes,Route, Outlet} from "react-router-dom"
import { Register } from "./register"

import { Login } from "./login"




export const App = ()=>{
    return(
   
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    </Router>
  
    )
}